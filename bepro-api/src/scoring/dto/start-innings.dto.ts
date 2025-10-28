import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class StartInningsDto {
  @ApiProperty({ example: 'TEAM_ID_BATTING' })
  @IsString() battingTeamId!: string;

  @ApiProperty({ example: 'TEAM_ID_BOWLING' })
  @IsString() bowlingTeamId!: string;

  @ApiProperty({ example: 1, description: 'Innings number' })
  @IsInt() @Min(1) number!: number;
}
