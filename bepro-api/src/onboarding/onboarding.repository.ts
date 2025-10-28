import { Injectable } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OnboardingRepository {
  constructor(private prisma: PrismaService) {}

  getByUserId(userId: string) {
    return this.prisma.profile.findUnique({ where: { userId } });
  }

  create(userId: string, data: Prisma.ProfileCreateInput) {
    return this.prisma.profile.create({
      data: { ...data, user: { connect: { id: userId } } },
    });
  }

  update(userId: string, data: Prisma.ProfileUpdateInput) {
    return this.prisma.profile.update({ where: { userId }, data });
  }

  delete(userId: string) {
    return this.prisma.profile.delete({ where: { userId } });
  }
}
