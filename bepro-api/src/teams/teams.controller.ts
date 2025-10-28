import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { QueryTeamDto } from './dto/query-team.dto';
import { AccessTokenGuard } from '../auth/guards/access.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('Teams')
@ApiBearerAuth()
// Login required for all routes; RolesGuard only applies where @Roles used.
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teams: TeamsService) {}

  // ✅ Any logged-in user can create (owner auto-added as CAPTAIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create team (logged-in) — owner auto-added as CAPTAIN' })
  create(@GetUser('sub') ownerId: string, @Body() dto: CreateTeamDto) {
    return this.teams.create(ownerId, dto);
  }

  // ✅ Current user's own teams
  @Get('mine')
  @ApiOperation({ summary: 'List my teams' })
  listMine(@GetUser('sub') userId: string) {
    return this.teams.listMine(userId);
  }

  // 🔒 Admin listing (pagination/search)
  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'List teams (admin)' })
  list(@Query() q: QueryTeamDto) {
    return this.teams.list(q);
  }

  // ℹ️ Get by id (any logged-in user)
  @Get(':id')
  @ApiOperation({ summary: 'Get team by id' })
  get(@Param('id') id: string) {
    return this.teams.get(id);
  }

  // ✅ Only owner or admin can update
  @Put(':id')
  @ApiOperation({ summary: 'Update team (owner or admin)' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTeamDto,
    @GetUser('sub') userId: string,
    @GetUser('role') role: string,
  ) {
    const isAdmin = role === 'admin';
    return this.teams.update(id, dto, userId, isAdmin);
  }

  // ✅ Only owner or admin can delete
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete team (owner or admin)' })
  remove(
    @Param('id') id: string,
    @GetUser('sub') userId: string,
    @GetUser('role') role: string,
  ) {
    const isAdmin = role === 'admin';
    return this.teams.remove(id, userId, isAdmin);
  }
}
