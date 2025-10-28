import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { TossDto } from './dto/toss.dto';
import { SetPlayingXIDto } from './dto/playingxi.dto';
import { AccessTokenGuard } from '../auth/guards/access.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('Matches')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('matches')
export class MatchesController {
  constructor(private readonly svc: MatchesService) {}

  // Create (schedule)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create/schedule a match (team owner/admin)' })
  create(@GetUser() user: any, @Body() dto: CreateMatchDto) {
    return this.svc.create(user, dto);
  }

  // List
  @Get()
  @ApiOperation({ summary: 'List matches (optional filters)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'status', required: false, example: 'SCHEDULED' })
  @ApiQuery({ name: 'teamId', required: false, example: 'TEAM_ID' })
  list(@Query('page') page?: string, @Query('limit') limit?: string, @Query('status') status?: string, @Query('teamId') teamId?: string) {
    return this.svc.list(parseInt(page || '1', 10), parseInt(limit || '10', 10), status as any, teamId);
  }

  // Get one
  @Get(':id')
  @ApiOperation({ summary: 'Get match by id' })
  get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  // Update schedule/meta
  @Put(':id')
  @ApiOperation({ summary: 'Update scheduled match (owner/admin)' })
  update(@GetUser() user: any, @Param('id') id: string, @Body() dto: UpdateMatchDto) {
    return this.svc.update(user, id, dto);
  }

  // Delete match
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete match (owner/admin)' })
  remove(@GetUser() user: any, @Param('id') id: string) {
    return this.svc.remove(user, id);
  }

  // Toss
  @Post(':id/toss')
  @ApiOperation({ summary: 'Set/Update toss (owner/admin)' })
  toss(@GetUser() user: any, @Param('id') id: string, @Body() dto: TossDto) {
    return this.svc.toss(user, id, dto);
  }

  // Playing XI (per team)
  @Post(':id/playingxi')
  @ApiOperation({ summary: 'Set Playing XI for a team (owner/admin of the match teams)' })
  setXI(@GetUser() user: any, @Param('id') id: string, @Body() dto: SetPlayingXIDto) {
    return this.svc.setPlayingXI(user, id, dto);
  }

  @Get(':id/playingxi')
  @ApiOperation({ summary: 'Get Playing XI of both teams' })
  getXI(@Param('id') id: string) {
    return this.svc.getPlayingXI(id);
  }
}
