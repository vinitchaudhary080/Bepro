import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MatchesRepository } from './matches.repository';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { TossDto } from './dto/toss.dto';
import { SetPlayingXIDto } from './dto/playingxi.dto';
import { TeamsService } from '../teams/teams.service';
import { PrismaService } from '../prisma/prisma.service';
import { MatchStatus } from '@prisma/client';

@Injectable()
export class MatchesService {
  constructor(
    private readonly repo: MatchesRepository,
    private readonly teams: TeamsService,
    private readonly prisma: PrismaService
  ) {}

  private async assertManager(user: { sub:string; role:string }, matchId: string) {
    const m = await this.repo.get(matchId);
    if (!m) throw new NotFoundException('Match not found');
    const isAdmin = user.role === 'admin';
    const isOwnerA = m.teamA.ownerId === user.sub;
    const isOwnerB = m.teamB.ownerId === user.sub;
    if (!isAdmin && !isOwnerA && !isOwnerB) {
      throw new ForbiddenException('Only team owner/admin can manage this match');
    }
    return m;
  }

  async create(user: any, dto: CreateMatchDto) {
    if (dto.teamAId === dto.teamBId) throw new BadRequestException('Both teams cannot be same');
    // Ensure user owns at least one of the teams (or admin)
    const isAdmin = user.role === 'admin';
    const tA = await this.teams.get(dto.teamAId);
    const tB = await this.teams.get(dto.teamBId);
    if (!tA || !tB) throw new NotFoundException('Team not found');

    if (!isAdmin && !(tA.ownerId === user.sub || tB.ownerId === user.sub)) {
      throw new ForbiddenException('You must own at least one of the teams');
    }

    const match = await this.repo.create({
      teamA: { connect: { id: dto.teamAId } },
      teamB: { connect: { id: dto.teamBId } },
      ground: dto.ground,
      startTime: new Date(dto.startTime),
      overs: dto.overs,
      ballType: dto.ballType as any,
      status: 'SCHEDULED',
    });
    return match;
  }

  get(id: string) {
    return this.repo.get(id);
  }

  list(page=1, limit=10, status?: any, teamId?: string) {
    return this.repo.list({ page, limit, status, teamId });
  }

  async update(user: any, id: string, dto: UpdateMatchDto) {
    await this.assertManager(user, id);
    const match = await this.repo.update(id, {
      ground: dto.ground,
      startTime: dto.startTime ? new Date(dto.startTime) : undefined,
      overs: dto.overs,
      ballType: dto.ballType as any,
    });
    return match;
  }

  async remove(user: any, id: string) {
    await this.assertManager(user, id);
    await this.repo.delete(id);
    return { message: 'Match deleted' };
  }

  // ---- Toss ----
  async toss(user: any, id: string, dto: TossDto) {
    const m = await this.assertManager(user, id);
    if (m.status !== MatchStatus.SCHEDULED && m.status !== MatchStatus.TOSS) {
      throw new BadRequestException('Toss can only be set before lineups are finalized');
    }
    if (dto.winnerTeamId !== m.teamAId && dto.winnerTeamId !== m.teamBId) {
      throw new BadRequestException('winnerTeamId must be one of match teams');
    }
    const toss = await this.repo.upsertToss(id, dto.winnerTeamId, dto.decision as any);
    if (m.status === MatchStatus.SCHEDULED) {
      await this.repo.update(id, { status: MatchStatus.TOSS });
    }
    return toss;
  }

  // ---- Playing XI ----
  async setPlayingXI(user: any, matchId: string, payload: SetPlayingXIDto) {
    const m = await this.assertManager(user, matchId);
    if (
  m.status !== MatchStatus.SCHEDULED &&
  m.status !== MatchStatus.TOSS &&
  m.status !== MatchStatus.LINEUP_SET
) {
  throw new BadRequestException('Cannot set lineup at this stage');
}
    if (payload.teamId !== m.teamAId && payload.teamId !== m.teamBId) {
      throw new BadRequestException('teamId must be one of match teams');
    }

    // Validate: players belong to team & approved
    const ids = payload.players.map(p => p.userId);
    const hasDup = new Set(ids).size !== ids.length;
    if (hasDup) throw new BadRequestException('Duplicate player in XI');

    const battingOrders = payload.players.map(p => p.battingOrder).filter(Boolean);
    const hasDupOrder = new Set(battingOrders).size !== battingOrders.length;
    if (hasDupOrder) throw new BadRequestException('Duplicate batting order');

    const members = await this.prisma.teamMember.findMany({
      where: { teamId: payload.teamId, userId: { in: ids }, status: 'APPROVED' }
    });
    if (members.length !== ids.length) {
      throw new BadRequestException('All players must be approved members of the team');
    }

    // Exactly 11? Allow less for friendlies? Here: up to 11; at least 1.
    if (payload.players.length > 11) {
      throw new BadRequestException('XI cannot exceed 11 players');
    }

    // Replace lineup for this team
    await this.repo.clearLineup(matchId, payload.teamId);
    await this.repo.createLineup(payload.players.map(p => ({
      matchId,
      teamId: payload.teamId,
      userId: p.userId,
      isCaptain: !!p.isCaptain,
      isKeeper: !!p.isKeeper,
      battingOrder: p.battingOrder,
    })));

    // If both sides have XI, set status -> LINEUP_SET
    const aCount = await this.repo.countXI(matchId, m.teamAId);
    const bCount = await this.repo.countXI(matchId, m.teamBId);
    if (aCount > 0 && bCount > 0 && m.status !== MatchStatus.LINEUP_SET) {
      await this.repo.update(matchId, { status: MatchStatus.LINEUP_SET });
    }

    return { message: 'Playing XI saved' };
  }

  getPlayingXI(matchId: string) {
    return this.repo.getLineup(matchId);
  }
}
