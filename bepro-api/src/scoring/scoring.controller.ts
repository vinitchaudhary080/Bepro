import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScoringService } from './scoring.service';
import { AccessTokenGuard } from '../auth/guards/access.guard';
import { StartInningsDto } from './dto/start-innings.dto';
import { StartOverDto } from './dto/start-over.dto';
import { AddBallDto } from './dto/add-ball.dto';
import { EndOverDto } from './dto/end-over.dto';
import { EndInningsDto } from './dto/end-innings.dto';

@ApiTags('Scoring')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('matches/:matchId/scoring')
export class ScoringController {
  constructor(private readonly svc: ScoringService) {}

  @Post('innings/start')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Start an innings' })
  startInnings(@Param('matchId') matchId: string, @Body() dto: StartInningsDto) {
    return this.svc.startInnings(matchId, dto);
  }

  @Post('overs/start')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Start an over' })
  startOver(@Body() dto: StartOverDto) {
    return this.svc.startOver(dto);
  }

  @Post('balls/add')
  @ApiOperation({ summary: 'Add a ball to current over' })
  addBall(@Param('matchId') matchId: string, @Body() dto: AddBallDto) {
    return this.svc.addBall(matchId, dto);
  }

  @Post('overs/end')
  @ApiOperation({ summary: 'End an over (optional explicit)' })
  endOver(@Body() dto: EndOverDto) {
    return this.svc.endOver(dto);
  }

  @Post('innings/end')
  @ApiOperation({ summary: 'End current innings' })
  endInnings(@Param('matchId') matchId: string, @Body() dto: EndInningsDto) {
    return this.svc.endInnings(matchId, dto);
  }

  @Get('snapshot')
  @ApiOperation({ summary: 'Get score snapshots of all innings' })
  snapshot(@Param('matchId') matchId: string) {
    return this.svc.snapshot(matchId);
  }
}
