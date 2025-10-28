import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Delhi Daredevils' })
  @IsString() @MinLength(2)
  name!: string;

  @ApiProperty({ example: 'delhi-daredevils' })
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @ApiProperty({ example: 'https://cdn.example.com/team/logo.png', required: false })
  @IsOptional() @IsString()
  logoUrl?: string;
}
