import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { GenderEnum, PlayerRoleEnum, BattingStyleEnum, BowlingStyleEnum } from './create-profile.dto';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Rahul Sharma' })
  @IsOptional() @IsString() @MaxLength(80)
  fullName?: string;

  @ApiPropertyOptional({ enum: GenderEnum })
  @IsOptional() @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @ApiPropertyOptional({ example: '1998-09-15' })
  @IsOptional() @IsDateString()
  dob?: string;

  @ApiPropertyOptional({ example: 'India' }) @IsOptional() @IsString() country?: string;
  @ApiPropertyOptional({ example: 'Delhi' }) @IsOptional() @IsString() state?: string;
  @ApiPropertyOptional({ example: 'New Delhi' }) @IsOptional() @IsString() city?: string;
  @ApiPropertyOptional({ example: '110001' }) @IsOptional() @IsString() pincode?: string;

  @ApiPropertyOptional({ enum: PlayerRoleEnum })
  @IsOptional() @IsEnum(PlayerRoleEnum)
  role?: PlayerRoleEnum;

  @ApiPropertyOptional({ enum: BattingStyleEnum })
  @IsOptional() @IsEnum(BattingStyleEnum)
  battingStyle?: BattingStyleEnum;

  @ApiPropertyOptional({ enum: BowlingStyleEnum })
  @IsOptional() @IsEnum(BowlingStyleEnum)
  bowlingStyle?: BowlingStyleEnum;

  @ApiPropertyOptional({ example: 18 })
  @IsOptional() @IsInt() @Min(0)
  jerseyNumber?: number;

  @ApiPropertyOptional({ example: 175 })
  @IsOptional() @IsInt() @Min(0)
  heightCm?: number;

  @ApiPropertyOptional({ example: 70 })
  @IsOptional() @IsInt() @Min(0)
  weightKg?: number;

  @ApiPropertyOptional({ example: 'Update bio...' })
  @IsOptional() @IsString() @MaxLength(200)
  bio?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatars/u1.png' })
  @IsOptional() @IsString()
  avatarUrl?: string;
}
