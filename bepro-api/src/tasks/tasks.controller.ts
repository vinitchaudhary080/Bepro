import { Controller, Get, Post, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { AccessTokenGuard } from '../auth/guards/access.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get('today')
  @ApiOperation({ summary: 'Get today\'s tasks (daily/weekly/monthly) for current user' })
  getToday(@GetUser('sub') userId: string) {
    return this.tasks.getTodayTasks(userId);
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete a user task and gain value points' })
  complete(@GetUser('sub') userId: string, @Param('id') id: string) {
    return this.tasks.completeTask(userId, id);
  }
}
