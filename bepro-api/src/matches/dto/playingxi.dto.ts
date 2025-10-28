import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class XIPlayerDto {
  @ApiProperty({ example: 'USER_ID' })
  @IsString() userId!: string;

  @ApiProperty({ example: 1, description: '1..11 batting order' })
  @IsInt() @Min(1) battingOrder!: number;

  @ApiProperty({ example: false }) @IsOptional() @IsBoolean() isCaptain?: boolean;
  @ApiProperty({ example: false }) @IsOptional() @IsBoolean() isKeeper?: boolean;
}

export class SetPlayingXIDto {
  @ApiProperty({ example: 'TEAM_ID' })
  @IsString() teamId!: string;

  @ApiProperty({ type: [XIPlayerDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(11)
  @ValidateNested({ each: true })
  @Type(() => XIPlayerDto)
  players!: XIPlayerDto[];
}
