import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(public readonly repo: UsersRepository) {}

  // --- Registration
  async register(dto: CreateUserDto) {
    const exists = await this.repo.findByEmail(dto.email);
    if (exists) throw new BadRequestException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.repo.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      phone: dto.phone,
      role: 'player',
    });
    const { passwordHash: _, refreshTokenHash: __, ...safe } = user;
    return safe;
  }

  // --- Login helper
  async validateUser(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user || !user.isActive) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async setRefreshToken(userId: string, refreshToken: string, rotateVersion = false) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
    await this.repo.update(userId, {
      refreshTokenHash,
      ...(rotateVersion ? { tokenVersion: { increment: 1 } } : {}),
    });
  }

  async clearRefreshToken(userId: string) {
    await this.repo.update(userId, { refreshTokenHash: null, tokenVersion: { increment: 1 } });
  }

  async verifyStoredRefreshToken(userId: string, incomingRefreshToken: string) {
    const user = await this.repo.findById(userId);
    if (!user || !user.refreshTokenHash) return false;
    return bcrypt.compare(incomingRefreshToken, user.refreshTokenHash);
  }

  toSafe(user: any) {
    const { passwordHash, refreshTokenHash, ...safe } = user;
    return safe;
  }

  // --- SELF PROFILE
  async getMe(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user || !user.isActive) throw new NotFoundException('User not found');
    return this.toSafe(user);
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    const user = await this.repo.update(userId, {
      ...(dto.name ? { name: dto.name } : {}),
      ...(dto.phone ? { phone: dto.phone } : {}),
    });
    return this.toSafe(user);
  }

  async deleteMe(userId: string) {
    await this.repo.update(userId, {
      isActive: false,
      deletedAt: new Date(),
      tokenVersion: { increment: 1 },
      refreshTokenHash: null,
    });
    return { message: 'Account deactivated' };
  }

  // --- ADMIN LIST
  async adminListUsers(q: {
    page?: number; size?: number; search?: string; role?: string; includeDeleted?: boolean;
    sortBy?: 'createdAt' | 'name' | 'email' | 'role'; sortDir?: 'asc' | 'desc';
  }) {
    const page = Math.max(1, Number(q.page ?? 1));
    const size = Math.min(100, Math.max(1, Number(q.size ?? 20)));

    const { items, total } = await this.repo.adminList({
      page,
      size,
      search: q.search,
      role: q.role,
      includeDeleted: !!q.includeDeleted,
      sortBy: q.sortBy ?? 'createdAt',
      sortDir: (q.sortDir ?? 'desc') as 'asc' | 'desc',
    });

    return { page, size, total, pages: Math.ceil(total / size), items };
  }

  // --- LIST FOR TEAM INVITE
  async listUsersForInvite(
    userId: string,
    q: { page?: number; limit?: number; search?: string },
  ) {
    const page = Math.max(1, Number(q.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(q.limit ?? 20)));

    const { items, total } = await this.repo.listForInvite(userId, {
      page,
      limit,
      search: q.search,
    });

    return {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      items,
    };
  }
}
