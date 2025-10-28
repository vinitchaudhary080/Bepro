import { Module } from '@nestjs/common';
import { ScoringController } from './scoring.controller';
import { ScoringService } from './scoring.service';
import { ScoringRepository } from './scoring.repository';
import { LiveGateway } from './live.gateway';

@Module({
  controllers: [ScoringController],
  providers: [ScoringService, ScoringRepository, LiveGateway],
  exports: [ScoringService, LiveGateway],
})
export class ScoringModule {}
