import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TaskFrequency, TaskStatus } from '@prisma/client';

function getPeriod(frequency: TaskFrequency): { start: Date; end: Date } {
  const now = new Date();

  if (frequency === TaskFrequency.DAILY) {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return { start, end };
  }

  if (frequency === TaskFrequency.WEEKLY) {
    const day = now.getDay(); // 0-6
    const diff = (day + 6) % 7; // Monday ko week start maante hai yaha
    const start = new Date(now);
    start.setDate(now.getDate() - diff);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return { start, end };
  }

  // MONTHLY
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { start, end };
}

@Injectable()
export class TasksService {
  constructor(private readonly repo: TasksRepository) {}

  // 🔹 Get (and auto-generate) daily/weekly/monthly tasks for current user
  async getTodayTasks(userId: string) {
    const frequencies: TaskFrequency[] = [
      TaskFrequency.DAILY,
      TaskFrequency.WEEKLY,
      TaskFrequency.MONTHLY,
    ];

    const tasksForUser: { id: string }[] = [];

    for (const freq of frequencies) {
      const { start, end } = getPeriod(freq);

      let assignment = await this.repo.findUserTaskForPeriod({
        userId,
        frequency: freq,
        periodStart: start,
        periodEnd: end,
      });

      if (!assignment) {
        const template = await this.repo.getRandomTemplate(freq);
        if (!template) {
          // koi template hi nahi bana, skip
          continue;
        }

        assignment = await this.repo.createUserTask({
          user: { connect: { id: userId } },
          task: { connect: { id: template.id } },
          frequency: freq,
          status: TaskStatus.PENDING,
          points: template.points,
          periodStart: start,
          periodEnd: end,
        });
      }

      tasksForUser.push({ id: assignment.id });
    }

    // include template info for response
    const hydrated = await Promise.all(
      tasksForUser.map(t => this.repo.findUserTaskById(t.id)),
    );

    // null safe filter + type guard
    const nonNull = hydrated.filter(
      (ut): ut is NonNullable<(typeof hydrated)[number]> => ut !== null,
    );

    return nonNull.map((ut) => ({
      id: ut.id,
      frequency: ut.frequency,
      status: ut.status,
      points: ut.points,
      title: ut.task.title,
      description: ut.task.description,
      periodStart: ut.periodStart,
      periodEnd: ut.periodEnd,
      completedAt: ut.completedAt,
    }));
  }

  // 🔹 Complete a task
  async completeTask(userId: string, userTaskId: string) {
    const assignment = await this.repo.findUserTaskById(userTaskId);
    if (!assignment) throw new NotFoundException('Task assignment not found');

    if (assignment.userId !== userId) {
      throw new ForbiddenException('You cannot complete task of another user');
    }

    if (assignment.status === TaskStatus.COMPLETED) {
      throw new BadRequestException('Task already completed');
    }

    if (assignment.status === TaskStatus.EXPIRED) {
      throw new BadRequestException('Task has expired');
    }

    await this.repo.updateUserTask(assignment.id, {
      status: TaskStatus.COMPLETED,
      completedAt: new Date(),
    });

    await this.repo.updateUserPoints(userId, assignment.points);

    return {
      message: 'Task completed',
      gainedPoints: assignment.points,
    };
  }
}
