import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum TossDecisionEnum { BAT='BAT', BOWL='BOWL' }

export class TossDto {
  @ApiProperty({ example: 'WINNER_TEAM_ID' })
  @IsString() winnerTeamId!: string;

  @ApiProperty({ enum: TossDecisionEnum, example: TossDecisionEnum.BAT })
  @IsEnum(TossDecisionEnum) decision!: TossDecisionEnum;
}
