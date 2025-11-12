import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

// added imports
import { PrismaService } from '../prisma/prisma.service';
import { MemberStatus, TeamRole } from '@prisma/client';
import { InviteMembersDto } from './dto/invite-members.dto';
import { RespondInviteDto } from './dto/respond-invite.dto';

@Injectable()
export class TeamsService {
  // inject PrismaService
  constructor(
    private readonly repo: TeamsRepository,
    private readonly prisma: PrismaService,
  ) {}

  // Owner = current user
  async create(ownerId: string, dto: CreateTeamDto) {
    const exists = await this.repo.findBySlug(dto.slug);
    if (exists) throw new BadRequestException('Slug already in use');

    // 1) create team
    const team = await this.repo.create({
      name: dto.name,
      slug: dto.slug,
      logoUrl: dto.logoUrl,
      owner: { connect: { id: ownerId } },
    });

    // 2) auto-add owner as APPROVED + CAPTAIN in TeamMember
    await this.prisma.teamMember.create({
      data: {
        team: { connect: { id: team.id } },
        user: { connect: { id: ownerId } },
        roleInTeam: TeamRole.captain,
        status: MemberStatus.APPROVED,
        invitedBy: { connect: { id: ownerId } },
        note: 'Auto-added as captain on team creation',
      },
    });

    return team;
  }

  async get(id: string) {
    const t = await this.repo.findById(id);
    if (!t) throw new NotFoundException('Team not found');
    return t;
  }

  async update(id: string, dto: UpdateTeamDto, requesterId: string, isAdmin: boolean) {
    const t = await this.repo.findById(id);
    if (!t) throw new NotFoundException('Team not found');

    if (!isAdmin && t.ownerId !== requesterId) {
      throw new ForbiddenException('Only owner or admin can update this team');
    }

    if (dto.slug) {
      const exists = await this.repo.findBySlug(dto.slug);
      if (exists && exists.id !== id) throw new BadRequestException('Slug already in use');
    }

    return this.repo.update(id, dto);
  }

  async remove(id: string, requesterId: string, isAdmin: boolean) {
    const t = await this.repo.findById(id);
    if (!t) throw new NotFoundException('Team not found');

    if (!isAdmin && t.ownerId !== requesterId) {
      throw new ForbiddenException('Only owner or admin can delete this team');
    }

    await this.repo.delete(id);
    return { message: 'Team deleted' };
  }

  // Admin list
  list(q: { page: number; limit: number; sortBy: any; order: any; search?: string }) {
    return this.repo.list(q);
  }

  // Current user's teams
  listMine(ownerId: string) {
    return this.repo.listByOwner(ownerId);
  }

  /* ----------------------------------------------------------------
   *  INVITES: send, list for user, respond (accept/reject)
   * ---------------------------------------------------------------- */

  // Send invites to multiple users for a specific team
  async inviteMembers(
    teamId: string,
    requesterId: string,
    isAdmin: boolean,
    dto: InviteMembersDto,
  ) {
    const team = await this.repo.findById(teamId);
    if (!team) throw new NotFoundException('Team not found');

    if (!isAdmin && team.ownerId !== requesterId) {
      throw new ForbiddenException('Only team owner or admin can send invites');
    }

    const { userIds, note } = dto;
    if (!userIds || !userIds.length) {
      throw new BadRequestException('At least one userId is required');
    }

    const results: {
      userId: string;
      status: 'created' | 'already_member' | 'already_pending' | 'reinvited';
    }[] = [];

    for (const userId of userIds) {
      if (userId === team.ownerId) {
        results.push({ userId, status: 'already_member' });
        continue;
      }

      const existing = await this.prisma.teamMember.findUnique({
        where: {
          teamId_userId: {
            teamId,
            userId,
          },
        },
      });

      if (existing) {
        if (existing.status === MemberStatus.APPROVED) {
          results.push({ userId, status: 'already_member' });
          continue;
        }

        if (existing.status === MemberStatus.PENDING) {
          results.push({ userId, status: 'already_pending' });
          continue;
        }

        await this.prisma.teamMember.update({
          where: { id: existing.id },
          data: {
            status: MemberStatus.PENDING,
            invitedById: requesterId,
            note: note ?? existing.note,
          },
        });
        results.push({ userId, status: 'reinvited' });
        continue;
      }

      await this.prisma.teamMember.create({
        data: {
          team: { connect: { id: teamId } },
          user: { connect: { id: userId } },
          roleInTeam: TeamRole.player,
          status: MemberStatus.PENDING,
          invitedBy: { connect: { id: requesterId } },
          note: note ?? null,
        },
      });

      results.push({ userId, status: 'created' });
    }

    return {
      teamId,
      results,
    };
  }

  // List invites for current logged-in user
  async listInvitesForUser(userId: string) {
    const invites = await this.prisma.teamMember.findMany({
      where: {
        userId,
        status: MemberStatus.PENDING,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        teamId: true,
        roleInTeam: true,
        note: true,
        createdAt: true,
        team: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
            ownerId: true,
          },
        },
        invitedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return invites.map((inv) => ({
      memberId: inv.id,
      teamId: inv.teamId,
      teamName: inv.team.name,
      teamSlug: inv.team.slug,
      teamLogoUrl: inv.team.logoUrl,
      roleInTeam: inv.roleInTeam,
      note: inv.note,
      invitedBy: inv.invitedBy
        ? {
            id: inv.invitedBy.id,
            name: inv.invitedBy.name,
            email: inv.invitedBy.email,
          }
        : null,
      createdAt: inv.createdAt,
    }));
  }

  // Accept or reject invite by TeamMember.id
  async respondToInvite(
    memberId: string,
    userId: string,
    action: RespondInviteDto['action'],
  ) {
    const membership = await this.prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!membership) {
      throw new NotFoundException('Invite not found');
    }

    if (membership.userId !== userId) {
      throw new ForbiddenException('You are not allowed to respond to this invite');
    }

    if (membership.status !== MemberStatus.PENDING) {
      throw new BadRequestException('Invite is not pending anymore');
    }

    const newStatus =
      action === 'accept' ? MemberStatus.APPROVED : MemberStatus.REJECTED;

    const updated = await this.prisma.teamMember.update({
      where: { id: memberId },
      data: {
        status: newStatus,
      },
    });

    return {
      message:
        action === 'accept'
          ? 'Invite accepted, you are now part of the team'
          : 'Invite rejected',
      status: updated.status,
    };
  }

  // - - - NEW: teams + approved players, formatted for match selection - - -
  async listTeamsWithMembersForSelection() {
    const teams = await this.repo.listWithMembers();

    return teams.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      logoUrl: t.logoUrl,
      ownerId: t.ownerId,
      createdAt: t.createdAt,
      players: t.members.map((m) => ({
        memberId: m.id,
        userId: m.user.id,
        name: m.user.name,
        email: m.user.email,
        phone: m.user.phone,
        avatarUrl: m.user.profile?.avatarUrl ?? null,
        roleInTeam: m.roleInTeam,
      })),
    }));
  }
}
