import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamMembersService } from './team-members.service';
import { AccessTokenGuard } from '../auth/guards/access.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { JoinTeamDto } from './dto/join-team.dto';
import { UpdateMemberRoleDto } from './dto/update-role.dto';

@ApiTags('Team Members')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('teams/:teamId/members')
export class TeamMembersController {
  constructor(private readonly svc: TeamMembersService) {}

  // USER — request to join a team
  @Post('join')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Request to join team (user)' })
  requestJoin(@Param('teamId') teamId: string, @GetUser() user: any, @Body() dto: JoinTeamDto) {
    return this.svc.requestJoin(teamId, user, dto);
  }

  // ADMIN/OWNER — list pending
  @Get('pending')
  @ApiOperation({ summary: 'List pending requests (owner/admin)' })
  listPending(@Param('teamId') teamId: string, @GetUser() user: any) {
    return this.svc.listPending(teamId, user);
  }

  // PUBLIC — list approved members
  @Get()
  @ApiOperation({ summary: 'List approved members (public)' })
  listApproved(@Param('teamId') teamId: string) {
    return this.svc.listMembers(teamId);
  }

  // ADMIN/OWNER — approve
  @Post(':memberId/approve')
  @ApiOperation({ summary: 'Approve member (owner/admin)' })
  approve(@Param('teamId') teamId: string, @Param('memberId') memberId: string, @GetUser() user: any) {
    return this.svc.approve(teamId, memberId, user);
  }

  // ADMIN/OWNER — reject
  @Post(':memberId/reject')
  @ApiOperation({ summary: 'Reject member (owner/admin)' })
  reject(@Param('teamId') teamId: string, @Param('memberId') memberId: string, @GetUser() user: any) {
    return this.svc.reject(teamId, memberId, user);
  }

  // ADMIN/OWNER — update role
  @Put(':memberId/role')
  @ApiOperation({ summary: 'Update member role (owner/admin)' })
  updateRole(
    @Param('teamId') teamId: string,
    @Param('memberId') memberId: string,
    @Body() dto: UpdateMemberRoleDto,
    @GetUser() user: any
  ) {
    return this.svc.updateRole(teamId, memberId, dto, user);
  }

  // ADMIN/OWNER — remove member
  @Delete(':memberId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove member from team (owner/admin)' })
  remove(@Param('teamId') teamId: string, @Param('memberId') memberId: string, @GetUser() user: any) {
    return this.svc.remove(teamId, memberId, user);
  }

  // USER — leave team himself
  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Leave team (self)' })
  leave(@Param('teamId') teamId: string, @GetUser('sub') userId: string) {
    return this.svc.leave(teamId, userId);
  }
}
