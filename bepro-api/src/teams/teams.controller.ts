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
import { InviteMembersDto } from './dto/invite-members.dto';
import { RespondInviteDto } from './dto/respond-invite.dto';

@ApiTags('Teams')
@ApiBearerAuth()
// Login required for all routes; RolesGuard only applies where @Roles used.
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teams: TeamsService) {}

  // Any logged-in user can create (owner auto-added as CAPTAIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create team (logged-in), owner auto-added as CAPTAIN' })
  create(@GetUser('sub') ownerId: string, @Body() dto: CreateTeamDto) {
    return this.teams.create(ownerId, dto);
  }

  // Current user's own teams
  @Get('mine')
  @ApiOperation({ summary: 'List my teams' })
  listMine(@GetUser('sub') userId: string) {
    return this.teams.listMine(userId);
  }

  // List pending invites for current user
  @Get('invites')
  @ApiOperation({ summary: 'List team invites sent to me (PENDING)' })
  listMyInvites(@GetUser('sub') userId: string) {
    return this.teams.listInvitesForUser(userId);
  }

  // - - - NEW: all teams + players, for match creation selection - - -
  @Get('with-members')
  @ApiOperation({ summary: 'List all teams with their approved players (for match creation)' })
  listTeamsWithMembers(@GetUser('sub') _userId: string) {
    // _userId abhi use nahi ho raha, future filters ke liye useful ho sakta hai
    return this.teams.listTeamsWithMembersForSelection();
  }

  // Admin listing (pagination/search)
  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'List teams (admin)' })
  list(@Query() q: QueryTeamDto) {
    return this.teams.list(q);
  }

  // Get team by id
  @Get(':id')
  @ApiOperation({ summary: 'Get team by id' })
  get(@Param('id') id: string) {
    return this.teams.get(id);
  }

  // Update team
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

  // Delete team
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

  // Send invites for a given team
  @Post(':id/invite')
  @ApiOperation({ summary: 'Invite multiple users to a team (owner or admin)' })
  inviteMembers(
    @Param('id') teamId: string,
    @GetUser('sub') userId: string,
    @GetUser('role') role: string,
    @Body() dto: InviteMembersDto,
  ) {
    const isAdmin = role === 'admin';
    return this.teams.inviteMembers(teamId, userId, isAdmin, dto);
  }

  // Accept or reject a specific invite
  @Post('invites/:memberId/respond')
  @ApiOperation({ summary: 'Accept or reject a team invite' })
  respondToInvite(
    @Param('memberId') memberId: string,
    @GetUser('sub') userId: string,
    @Body() dto: RespondInviteDto,
  ) {
    return this.teams.respondToInvite(memberId, userId, dto.action);
  }
}
