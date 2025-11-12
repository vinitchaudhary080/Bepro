import { Injectable } from '@nestjs/common';
import { Prisma, MemberStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamsRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TeamCreateInput) {
    return this.prisma.team.create({ data });
  }

  findById(id: string) {
    return this.prisma.team.findUnique({ where: { id } });
  }

  findBySlug(slug: string) {
    return this.prisma.team.findUnique({ where: { slug } });
  }

  update(id: string, data: Prisma.TeamUpdateInput) {
    return this.prisma.team.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.team.delete({ where: { id } });
  }

  async list(params: {
    page: number;
    limit: number;
    sortBy: 'createdAt' | 'name' | 'slug';
    order: 'asc' | 'desc';
    search?: string;
  }) {
    const { page, limit, sortBy, order, search } = params;
    const where: Prisma.TeamWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.team.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.team.count({ where }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  // current user's teams
  listByOwner(ownerId: string) {
    return this.prisma.team.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        logoUrl: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // - - - NEW: all teams with approved members and their user data - - -
  async listWithMembers() {
    return this.prisma.team.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        logoUrl: true,
        ownerId: true,
        createdAt: true,
        members: {
          where: { status: MemberStatus.APPROVED },
          select: {
            id: true,
            roleInTeam: true,
            status: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                profile: {
                  select: {
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
