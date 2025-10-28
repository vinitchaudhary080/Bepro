import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum TeamRoleEnum {
  player = 'player',
  captain = 'captain',
  vice_captain = 'vice_captain',
  coach = 'coach',
  manager = 'manager',
  wicket_keeper = 'wicket_keeper',
}

export class UpdateMemberRoleDto {
  @ApiProperty({ enum: TeamRoleEnum, example: TeamRoleEnum.vice_captain })
  @IsEnum(TeamRoleEnum)
  roleInTeam!: TeamRoleEnum;
}
