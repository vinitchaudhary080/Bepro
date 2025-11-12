import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  /* ---- Basic CRUD ---- */
  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  /* ---- Simple list (pagination + search) ---- */
  async list(params: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = params;

    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  /* ---- Admin list (pagination / search / role / includeDeleted / sort) ---- */
  async adminList(params: {
    page: number;
    size: number;
    search?: string;
    role?: string;
    includeDeleted: boolean;
    sortBy: 'createdAt' | 'name' | 'email' | 'role';
    sortDir: 'asc' | 'desc';
  }) {
    const { page, size, search, role, includeDeleted, sortBy, sortDir } = params;

    const where: Prisma.UserWhereInput = {
      ...(includeDeleted ? {} : { isActive: true }),
      ...(role ? { role } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy: { [sortBy]: sortDir },
        skip: (page - 1) * size,
        take: size,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          valuePoints: true, // ✅ Added for admin listing too
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total, page, size, pages: Math.ceil(total / size) };
  }

  /* ---- List for team invite (basic public info) ---- */
  async listForInvite(
    currentUserId: string,
    params: { page: number; limit: number; search?: string },
  ) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, params.limit || 20);
    const search = params.search?.trim();

    const where: Prisma.UserWhereInput = {
      isActive: true,
      deletedAt: null,
      ...(search && search.length
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          valuePoints: true, // ✅ Added this field
          profile: {
            select: {
              avatarUrl: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items: items.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        valuePoints: u.valuePoints ?? 0, // ✅ Safe fallback
        avatarUrl: u.profile?.avatarUrl ?? null,
      })),
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }
}
