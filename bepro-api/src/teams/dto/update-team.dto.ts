import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateTeamDto {
  @ApiPropertyOptional({ example: 'Delhi Capitals' })
  @IsOptional() @IsString() @MinLength(2)
  name?: string;

  @ApiPropertyOptional({ example: 'delhi-capitals' })
  @IsOptional() @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/team/logo2.png' })
  @IsOptional() @IsString()
  logoUrl?: string;
}
