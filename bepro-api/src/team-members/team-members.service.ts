import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { TeamsService } from '../teams/teams.service';
import { TeamMembersRepository } from './team-members.repository';
import { JoinTeamDto } from './dto/join-team.dto';
import { MemberStatus } from '@prisma/client';
import { UpdateMemberRoleDto } from './dto/update-role.dto';

@Injectable()
export class TeamMembersService {
  constructor(
    private readonly teams: TeamsService,
    private readonly repo: TeamMembersRepository
  ) {}

  private async assertOwnerOrAdmin(requestor: { sub:string; role:string }, teamId: string) {
    const team = await this.teams.get(teamId);
    if (!team) throw new NotFoundException('Team not found');
    const isOwner = team.ownerId === requestor.sub;
    const isAdmin = requestor.role === 'admin';
    if (!isOwner && !isAdmin) throw new ForbiddenException('Only owner/admin can perform this action');
    return team;
  }

  async requestJoin(teamId: string, user: { sub:string; role:string }, dto: JoinTeamDto) {
    const team = await this.teams.get(teamId);
    if (!team) throw new NotFoundException('Team not found');

    const exists = await this.repo.findByTeamAndUser(teamId, user.sub);
    if (exists) {
      if (exists.status === MemberStatus.PENDING) throw new BadRequestException('Request already pending');
      if (exists.status === MemberStatus.APPROVED) throw new BadRequestException('Already a member');
      // was rejected earlier → allow re-request? choose policy; here allow re-request:
      await this.repo.remove(exists.id);
    }

    const req = await this.repo.createRequest({
      team: { connect: { id: teamId } },
      user: { connect: { id: user.sub } },
      status: MemberStatus.PENDING,
      roleInTeam: 'player',
      note: dto.note,
    });

    return req;
  }

  async listMembers(teamId: string) {
    return this.repo.listApproved(teamId);
  }

  async listPending(teamId: string, reqUser: { sub:string; role:string }) {
    await this.assertOwnerOrAdmin(reqUser, teamId);
    return this.repo.listPending(teamId);
  }

  async approve(teamId: string, memberId: string, reqUser: { sub:string; role:string }) {
    await this.assertOwnerOrAdmin(reqUser, teamId);
    const m = await this.repo.findById(memberId);
    if (!m || m.teamId !== teamId) throw new NotFoundException('Member request not found');
    if (m.status === MemberStatus.APPROVED) return m;
    return this.repo.approve(memberId);
  }

  async reject(teamId: string, memberId: string, reqUser: { sub:string; role:string }) {
    await this.assertOwnerOrAdmin(reqUser, teamId);
    const m = await this.repo.findById(memberId);
    if (!m || m.teamId !== teamId) throw new NotFoundException('Member request not found');
    if (m.status === MemberStatus.REJECTED) return m;
    return this.repo.reject(memberId);
  }

  async remove(teamId: string, memberId: string, reqUser: { sub:string; role:string }) {
    await this.assertOwnerOrAdmin(reqUser, teamId);
    const m = await this.repo.findById(memberId);
    if (!m || m.teamId !== teamId) throw new NotFoundException('Member not found');
    return this.repo.remove(memberId);
  }

  async leave(teamId: string, userId: string) {
    const m = await this.repo.findByTeamAndUser(teamId, userId);
    if (!m) throw new NotFoundException('Membership not found');
    return this.repo.leave(teamId, userId);
  }

  async updateRole(teamId: string, memberId: string, dto: UpdateMemberRoleDto, reqUser: { sub:string; role:string }) {
    await this.assertOwnerOrAdmin(reqUser, teamId);
    const m = await this.repo.findById(memberId);
    if (!m || m.teamId !== teamId) throw new NotFoundException('Member not found');
    if (m.status !== MemberStatus.APPROVED) throw new BadRequestException('Only approved members can have roles');
    return this.repo.updateRole(memberId, dto.roleInTeam);
  }
}
