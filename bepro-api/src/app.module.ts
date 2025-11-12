import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envValidation from './config/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { MatchesModule } from './matches/matches.module';
import { ScoringModule } from './scoring/scoring.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: envValidation }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TeamsModule,
    TeamMembersModule,
    MatchesModule,
    ScoringModule,
    OnboardingModule,
    TasksModule,
  ],
})
export class AppModule {}
