import { Injectable } from '@nestjs/common';
import { Prisma, MemberStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamMembersRepository {
  constructor(private prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.teamMember.findUnique({ where: { id } });
  }

  findByTeamAndUser(teamId: string, userId: string) {
    return this.prisma.teamMember.findUnique({ where: { teamId_userId: { teamId, userId } } });
  }

  createRequest(data: Prisma.TeamMemberCreateInput) {
    return this.prisma.teamMember.create({ data });
  }

  listApproved(teamId: string) {
    return this.prisma.teamMember.findMany({
      where: { teamId, status: MemberStatus.APPROVED },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  listPending(teamId: string) {
    return this.prisma.teamMember.findMany({
      where: { teamId, status: MemberStatus.PENDING },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  approve(id: string) {
    return this.prisma.teamMember.update({
      where: { id },
      data: { status: MemberStatus.APPROVED },
    });
  }

  reject(id: string) {
    return this.prisma.teamMember.update({
      where: { id },
      data: { status: MemberStatus.REJECTED },
    });
  }

  updateRole(id: string, roleInTeam: string) {
    return this.prisma.teamMember.update({
      where: { id },
      data: { roleInTeam: roleInTeam as any },
    });
  }

  remove(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }

  leave(teamId: string, userId: string) {
    return this.prisma.teamMember.delete({ where: { teamId_userId: { teamId, userId } } });
  }
}
