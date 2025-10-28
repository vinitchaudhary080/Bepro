import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class StartOverDto {
  @ApiProperty({ example: 'INNINGS_ID' })
  @IsString() inningsId!: string;

  @ApiProperty({ example: 1 })
  @IsInt() @Min(1) number!: number;

  @ApiProperty({ example: 'BOWLER_USER_ID' })
  @IsString() bowlerId!: string;

  @ApiProperty({ example: 'STRIKER_USER_ID' })
  @IsString() strikerId!: string;

  @ApiProperty({ example: 'NON_STRIKER_USER_ID' })
  @IsString() nonStrikerId!: string;
}
