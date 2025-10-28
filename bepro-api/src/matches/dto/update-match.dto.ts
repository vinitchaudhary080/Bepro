import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { BallTypeEnum } from './create-match.dto';

export class UpdateMatchDto {
  @ApiPropertyOptional({ example: 'New Ground' })
  @IsOptional() @IsString()
  ground?: string;

  @ApiPropertyOptional({ example: '2025-11-02T09:30:00.000Z' })
  @IsOptional() @IsDateString()
  startTime?: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional() @IsInt() @Min(1)
  overs?: number;

  @ApiPropertyOptional({ enum: BallTypeEnum })
  @IsOptional() @IsEnum(BallTypeEnum)
  ballType?: BallTypeEnum;
}
