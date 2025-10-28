import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ScoringRepository } from './scoring.repository';
import { StartInningsDto } from './dto/start-innings.dto';
import { StartOverDto } from './dto/start-over.dto';
import { AddBallDto, ExtraTypeEnum, WicketTypeEnum } from './dto/add-ball.dto';
import { EndInningsDto } from './dto/end-innings.dto';
import { EndOverDto } from './dto/end-over.dto';
import { LiveGateway } from './live.gateway';
import { MatchStatus } from '@prisma/client';

@Injectable()
export class ScoringService {
  constructor(
    private readonly repo: ScoringRepository,
    private readonly live: LiveGateway,
  ) {}

  // ---------------- Start innings ----------------
  async startInnings(matchId: string, dto: StartInningsDto) {
    // 1) Match must exist
    const match = await this.repo.getMatch(matchId);
    if (!match) throw new NotFoundException('Match not found');

    // 2) Team sanity (must be exactly the two teams of this match, and distinct)
    const belongsToMatch =
      [match.teamAId, match.teamBId].includes(dto.battingTeamId) &&
      [match.teamAId, match.teamBId].includes(dto.bowlingTeamId);
    if (!belongsToMatch) {
      throw new BadRequestException('battingTeamId/bowlingTeamId must be the two teams of this match');
    }
    if (dto.battingTeamId === dto.bowlingTeamId) {
      throw new BadRequestException('battingTeamId and bowlingTeamId cannot be same');
    }

    // 3) Innings number bounds
    if (dto.number < 1 || dto.number > 2) {
      throw new BadRequestException('innings number must be 1 or 2 for limited overs');
    }

    // 4) Duplication and sequencing
    const existing = await this.repo.listInningsByMatch(matchId);
    if (existing.find(i => i.number === dto.number)) {
      throw new BadRequestException('Innings already exists');
    }
    if (dto.number === 2) {
      const first = existing.find(i => i.number === 1);
      if (!first || !first.endedAt) {
        throw new BadRequestException('Second innings can start only after first innings has ended');
      }
    }

    // 5) Create innings
    const innings = await this.repo.createInnings({
      match: { connect: { id: matchId } },
      number: dto.number,
      battingTeam: { connect: { id: dto.battingTeamId } },
      bowlingTeam: { connect: { id: dto.bowlingTeamId } },
    });

    // 6) Move match to LIVE on first innings
    if (dto.number === 1 && match.status !== MatchStatus.LIVE) {
      await this.repo.patchMatch(matchId, { status: MatchStatus.LIVE });
    }

    // 7) WS
    this.live.emitToMatch(matchId, 'innings.started', { matchId, innings });
    return innings;
  }

  // ---------------- Start over ----------------
  async startOver(dto: StartOverDto) {
    const innings = await this.repo.getInnings(dto.inningsId);
    if (!innings) throw new NotFoundException('Innings not found');
    if (innings.endedAt) throw new BadRequestException('Innings already ended');

    // prevent duplicate over number within same innings
    const overs = await this.repo.listOversByInnings(innings.id);
    if (overs.some(o => o.number === dto.number)) {
      throw new BadRequestException('Over number already exists in this innings');
    }

    const over = await this.repo.createOver({
      innings: { connect: { id: dto.inningsId } },
      number: dto.number,
      bowlerId: dto.bowlerId,
      strikerId: dto.strikerId,
      nonStrikerId: dto.nonStrikerId,
    });

    this.live.emitToMatch(innings.matchId, 'over.started', { inningsId: innings.id, over });
    return over;
  }

  // ---------------- Add ball ----------------
  async addBall(matchId: string, payload: AddBallDto) {
    const over = await this.repo.getOver(payload.overId);
    if (!over) throw new NotFoundException('Over not found');
    if (over.isComplete) throw new BadRequestException('Over already completed');

    const innings = await this.repo.getInnings(over.inningsId);
    if (!innings) throw new NotFoundException('Innings not found');
    if (innings.endedAt) throw new BadRequestException('Innings ended');

    // basic sanity
    if ((payload.runs ?? 0) < 0 || (payload.extraRuns ?? 0) < 0) {
      throw new BadRequestException('runs/extraRuns cannot be negative');
    }

    // derive isLegal
    const isIllegal = payload.extraType === ExtraTypeEnum.WIDE || payload.extraType === ExtraTypeEnum.NOBALL;
    const isLegal = !isIllegal;

    // create ball
    const ball = await this.repo.addBall({
      over: { connect: { id: over.id } },
      seq: payload.seq,
      batsmanId: payload.batsmanId,
      nonStrikerId: payload.nonStrikerId,
      bowlerId: payload.bowlerId,
      runs: payload.runs,
      // store enums as strings compatible with Prisma enum values
      extraType: payload.extraType as unknown as any,
      extraRuns: payload.extraRuns,
      isLegal,
      wicketType: (payload.wicketType as unknown as any) ?? null,
      dismissalBatsmanId: payload.dismissalBatsmanId ?? null,
      fielderId: payload.fielderId ?? null,
      commentary: payload.commentary ?? null,
    });

    // update innings running totals
    const addRuns = (payload.runs || 0) + (payload.extraRuns || 0);
    const patch: Record<string, any> = { totalRuns: { increment: addRuns } };

    switch (payload.extraType) {
      case ExtraTypeEnum.WIDE:
        if (payload.extraRuns) patch.wides = { increment: payload.extraRuns };
        break;
      case ExtraTypeEnum.NOBALL:
        if (payload.extraRuns) patch.noBalls = { increment: payload.extraRuns };
        break;
      case ExtraTypeEnum.BYE:
        if (payload.extraRuns) patch.byes = { increment: payload.extraRuns };
        break;
      case ExtraTypeEnum.LEGBYE:
        if (payload.extraRuns) patch.legByes = { increment: payload.extraRuns };
        break;
    }

    if (isLegal) {
      patch.legalBalls = { increment: 1 };
    }

    if (payload.wicketType && payload.wicketType !== (null as any)) {
      patch.wickets = { increment: 1 };
    }

    await this.repo.patchInnings(innings.id, patch);

    // update over legal ball count and completion
    const newLegal = over.legalBalls + (isLegal ? 1 : 0);
    const isOverComplete = newLegal >= 6;
    await this.repo.patchOver(over.id, {
      legalBalls: newLegal,
      ...(isOverComplete ? { isComplete: true, endedAt: new Date() } : {}),
    });

    // strike rotation rules:
    // - rotate on odd "runs off the bat"
    // - illegal deliveries: strike stays
    // - end of over: swap
    let strikerId = over.strikerId;
    let nonStrikerId = over.nonStrikerId;

    if (isLegal) {
      const oddFromBat = (payload.runs || 0) % 2 === 1;
      if (oddFromBat) {
        const tmp = strikerId; strikerId = nonStrikerId; nonStrikerId = tmp;
      }
      if (isOverComplete) {
        const tmp = strikerId; strikerId = nonStrikerId; nonStrikerId = tmp;
      }
      await this.repo.patchOver(over.id, { strikerId, nonStrikerId });
    }

    // broadcast
    const snapshot = await this.snapshot(matchId);
    this.live.emitToMatch(matchId, 'ball.added', {
      matchId,
      inningsId: innings.id,
      overId: over.id,
      ball,
      snapshot,
    });

    if (isOverComplete) {
      this.live.emitToMatch(matchId, 'over.ended', {
        matchId,
        inningsId: innings.id,
        overId: over.id,
        snapshot,
      });
    }

    return { ball, snapshot };
  }

  // ---------------- End over explicitly ----------------
  async endOver(dto: EndOverDto) {
    const over = await this.repo.getOver(dto.overId);
    if (!over) throw new NotFoundException('Over not found');
    if (over.isComplete) return over;

    const innings = await this.repo.getInnings(over.inningsId);
    await this.repo.patchOver(over.id, { isComplete: true, endedAt: new Date() });

    const snapshot = await this.snapshot(innings!.matchId);
    this.live.emitToMatch(innings!.matchId, 'over.ended', {
      matchId: innings!.matchId,
      inningsId: innings!.id,
      overId: over.id,
      snapshot,
    });

    return { message: 'Over ended', snapshot };
  }

  // ---------------- End innings ----------------
  async endInnings(matchId: string, dto: EndInningsDto) {
    const innings = await this.repo.getInnings(dto.inningsId);
    if (!innings) throw new NotFoundException('Innings not found');
    if (innings.endedAt) return innings;

    await this.repo.endInnings(innings.id);
    this.live.emitToMatch(matchId, 'innings.ended', { matchId, inningsId: innings.id });

    // if second innings ended, mark match completed
    const all = await this.repo.listInningsByMatch(matchId);
    const ended = all.filter(i => i.endedAt);
    if (ended.length >= 2) {
      await this.repo.patchMatch(matchId, { status: MatchStatus.COMPLETED });
      this.live.emitToMatch(matchId, 'match.completed', { matchId });
    }

    return { message: 'Innings ended' };
  }

  // ---------------- Score snapshot ----------------
  async snapshot(matchId: string) {
    const inns = await this.repo.listInningsByMatch(matchId);
    return inns.map(i => ({
      inningsId: i.id,
      number: i.number,
      battingTeamId: i.battingTeamId,
      bowlingTeamId: i.bowlingTeamId,
      runs: i.totalRuns,
      wickets: i.wickets,
      legalBalls: i.legalBalls,
      overs: Math.floor(i.legalBalls / 6) + (i.legalBalls % 6) / 10, // e.g. 10.3
      wides: i.wides,
      noBalls: i.noBalls,
      byes: i.byes,
      legByes: i.legByes,
    }));
  }
}
