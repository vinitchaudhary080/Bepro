import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, PrismaService],
  exports: [TasksService],
})
export class TasksModule {}
