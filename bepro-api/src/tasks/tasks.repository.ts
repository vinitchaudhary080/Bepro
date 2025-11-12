import { Injectable } from '@nestjs/common';
import { Prisma, TaskFrequency, TaskStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Random active task template by frequency
  async getRandomTemplate(frequency: TaskFrequency) {
    const templates = await this.prisma.taskTemplate.findMany({
      where: { frequency, isActive: true },
    });
    if (!templates.length) return null;
    const idx = Math.floor(Math.random() * templates.length);
    return templates[idx];
  }

  // Find existing assignment of this frequency in this period
  async findUserTaskForPeriod(opts: {
    userId: string;
    frequency: TaskFrequency;
    periodStart: Date;
    periodEnd: Date;
  }) {
    const { userId, frequency, periodStart, periodEnd } = opts;
    return this.prisma.userTask.findFirst({
      where: {
        userId,
        frequency,
        periodStart: { gte: periodStart },
        periodEnd: { lte: periodEnd },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // Create new assignment for user
  createUserTask(data: Prisma.UserTaskCreateInput) {
    return this.prisma.userTask.create({ data });
  }

  // Load today's tasks for user (all frequencies)
  listTasksForUserInPeriod(userId: string, periodStart: Date, periodEnd: Date) {
    return this.prisma.userTask.findMany({
      where: {
        userId,
        periodStart: { gte: periodStart },
        periodEnd: { lte: periodEnd },
      },
      orderBy: { createdAt: 'asc' },
      include: {
        task: true,
      },
    });
  }

  findUserTaskById(id: string) {
    return this.prisma.userTask.findUnique({
      where: { id },
      include: { task: true, user: true },
    });
  }

  updateUserTask(id: string, data: Prisma.UserTaskUpdateInput) {
    return this.prisma.userTask.update({ where: { id }, data });
  }

  updateUserPoints(userId: string, delta: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { valuePoints: { increment: delta } },
    });
  }
}
