import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum ExtraTypeEnum { NONE='NONE', WIDE='WIDE', NOBALL='NOBALL', BYE='BYE', LEGBYE='LEGBYE' }
export enum WicketTypeEnum { BOWLED='BOWLED', CAUGHT='CAUGHT', LBW='LBW', RUN_OUT='RUN_OUT', STUMPED='STUMPED', HIT_WICKET='HIT_WICKET', OBSTRUCTING='OBSTRUCTING', RETIRED='RETIRED', TIMED_OUT='TIMED_OUT' }

export class AddBallDto {
  @ApiProperty({ example: 'OVER_ID' })
  @IsString() overId!: string;

  @ApiProperty({ example: 1, description: 'sequence within over' })
  @IsInt() @Min(1) seq!: number;

  @ApiProperty({ example: 'BATSMAN_USER_ID' })
  @IsString() batsmanId!: string;

  @ApiProperty({ example: 'NON_STRIKER_USER_ID' })
  @IsString() nonStrikerId!: string;

  @ApiProperty({ example: 'BOWLER_USER_ID' })
  @IsString() bowlerId!: string;

  @ApiProperty({ example: 0, description: 'batsman runs off the bat' })
  @IsInt() @Min(0) runs!: number;

  @ApiProperty({ enum: ExtraTypeEnum, example: ExtraTypeEnum.NONE })
  @IsEnum(ExtraTypeEnum) extraType!: ExtraTypeEnum;

  @ApiProperty({ example: 0 })
  @IsInt() @Min(0) extraRuns!: number;

  @ApiPropertyOptional({ enum: WicketTypeEnum })
  @IsOptional() @IsEnum(WicketTypeEnum) wicketType?: WicketTypeEnum;

  @ApiPropertyOptional({ example: 'DISMISSED_BATSMAN_USER_ID' })
  @IsOptional() @IsString() dismissalBatsmanId?: string;

  @ApiPropertyOptional({ example: 'FIELDER_USER_ID' })
  @IsOptional() @IsString() fielderId?: string;

  @ApiPropertyOptional({ example: 'good length, shaped away' })
  @IsOptional() @IsString() commentary?: string;
}
