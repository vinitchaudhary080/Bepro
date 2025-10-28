import { Injectable } from '@nestjs/common';
import { Prisma, ExtraType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoringRepository {
  constructor(private prisma: PrismaService) {}

  // --- Match (with teams) ---
  getMatch(id: string) {
    return this.prisma.match.findUnique({
      where: { id },
      include: { teamA: true, teamB: true },
    });
  }

  // --- Innings ---
  createInnings(data: Prisma.InningsCreateInput) {
    return this.prisma.innings.create({ data });
  }
  getInnings(id: string) {
    return this.prisma.innings.findUnique({ where: { id } });
  }
  listInningsByMatch(matchId: string) {
    return this.prisma.innings.findMany({ where: { matchId }, orderBy: { number: 'asc' } });
  }
  endInnings(id: string) {
    return this.prisma.innings.update({ where: { id }, data: { endedAt: new Date() } });
  }
  patchInnings(id: string, data: Prisma.InningsUpdateInput) {
    return this.prisma.innings.update({ where: { id }, data });
  }

  // --- Overs ---
  createOver(data: Prisma.OverCreateInput) {
    return this.prisma.over.create({ data });
  }
  getOver(id: string) {
    return this.prisma.over.findUnique({ where: { id } });
  }
  patchOver(id: string, data: Prisma.OverUpdateInput) {
    return this.prisma.over.update({ where: { id }, data });
  }
  listOverBalls(overId: string) {
    return this.prisma.ball.findMany({ where: { overId }, orderBy: { seq: 'asc' } });
  }
  // NEW: list overs by innings (for duplicate-over check)
  listOversByInnings(inningsId: string) {
    return this.prisma.over.findMany({ where: { inningsId }, orderBy: { number: 'asc' } });
  }

  // --- Balls ---
  addBall(data: Prisma.BallCreateInput) {
    return this.prisma.ball.create({ data });
  }

  // --- Match status/meta ---
  patchMatch(id: string, data: Prisma.MatchUpdateInput) {
    return this.prisma.match.update({ where: { id }, data });
  }

  // --- Helper ---
  isLegal(extraType: ExtraType) {
    return !(extraType === 'WIDE' || extraType === 'NOBALL');
  }
}
