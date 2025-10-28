import { Module } from '@nestjs/common';
import { TeamMembersController } from './team-members.controller';
import { TeamMembersService } from './team-members.service';
import { TeamMembersRepository } from './team-members.repository';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [TeamsModule],
  controllers: [TeamMembersController],
  providers: [TeamMembersService, TeamMembersRepository],
  exports: [TeamMembersService],
})
export class TeamMembersModule {}
