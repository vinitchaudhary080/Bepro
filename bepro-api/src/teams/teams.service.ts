import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

// ✅ added imports
import { PrismaService } from '../prisma/prisma.service';
import { MemberStatus, TeamRole } from '@prisma/client';

@Injectable()
export class TeamsService {
  // ✅ inject PrismaService (PrismaModule global hona chahiye)
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

    // 2) ✅ auto-add owner as APPROVED + CAPTAIN in TeamMember
    await this.prisma.teamMember.create({
      data: {
        team: { connect: { id: team.id } },
        user: { connect: { id: ownerId } },
        roleInTeam: TeamRole.captain,
        status: MemberStatus.APPROVED,
        invitedBy: { connect: { id: ownerId } }, // optional: who added
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
}
