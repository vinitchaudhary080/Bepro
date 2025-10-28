import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsString, Min } from 'class-validator';

export enum BallTypeEnum { LEATHER='LEATHER', TENNIS='TENNIS' }

export class CreateMatchDto {
  @ApiProperty({ example: 'TEAM_A_ID' })
  @IsString() teamAId!: string;

  @ApiProperty({ example: 'TEAM_B_ID' })
  @IsString() teamBId!: string;

  @ApiProperty({ example: 'Wankhede Stadium' })
  @IsString() ground!: string;

  @ApiProperty({ example: '2025-11-01T09:30:00.000Z' })
  @IsDateString() startTime!: string;

  @ApiProperty({ example: 20 })
  @IsInt() @Min(1) overs!: number;

  @ApiProperty({ enum: BallTypeEnum, example: BallTypeEnum.LEATHER })
  @IsEnum(BallTypeEnum) ballType!: BallTypeEnum;
}
