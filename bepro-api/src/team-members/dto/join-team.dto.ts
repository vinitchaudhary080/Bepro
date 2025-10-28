import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class JoinTeamDto {
  @ApiPropertyOptional({ example: 'I am an opening batsman' })
  @IsOptional() @IsString() @MaxLength(200)
  note?: string;
}
