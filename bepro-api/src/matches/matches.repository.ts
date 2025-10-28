import { Injectable } from '@nestjs/common';
import { Prisma, MatchStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchesRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.MatchCreateInput) {
    return this.prisma.match.create({ data });
  }

  get(id: string) {
    return this.prisma.match.findUnique({
      where: { id },
      include: { toss: true, lineup: true, teamA: true, teamB: true },
    });
  }

  update(id: string, data: Prisma.MatchUpdateInput) {
    return this.prisma.match.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.match.delete({ where: { id } });
  }

  list(params: { page:number; limit:number; status?: MatchStatus; teamId?: string }) {
    const { page, limit, status, teamId } = params;
    const where: Prisma.MatchWhereInput = {
      ...(status ? { status } : {}),
      ...(teamId ? { OR: [{ teamAId: teamId }, { teamBId: teamId }] } : {}),
    };
    return this.prisma.match.findMany({
      where,
      orderBy: { startTime: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { toss: true },
    });
  }

  upsertToss(matchId: string, winnerTeamId: string, decision: any) {
  return this.prisma.toss.upsert({
    where: { matchId },
    create: {
      match: { connect: { id: matchId } },
      winnerTeam: { connect: { id: winnerTeamId } }, // <-- relation object (NOT winnerTeamId scalar)
      decision,
    },
    update: {
      winnerTeam: { connect: { id: winnerTeamId } }, // <-- relation object
      decision,
    },
  });
}


  clearLineup(matchId: string, teamId: string) {
    return this.prisma.playingXI.deleteMany({ where: { matchId, teamId } });
  }

  createLineup(items: Prisma.PlayingXICreateManyInput[]) {
    return this.prisma.playingXI.createMany({ data: items, skipDuplicates: true });
  }

  getLineup(matchId: string) {
    return this.prisma.playingXI.findMany({
      where: { matchId },
      orderBy: [{ teamId: 'asc' }, { battingOrder: 'asc' }],
      include: { player: true, team: true },
    });
  }

  countXI(matchId: string, teamId: string) {
    return this.prisma.playingXI.count({ where: { matchId, teamId } });
  }
}
