import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export enum GenderEnum { MALE='MALE', FEMALE='FEMALE', OTHER='OTHER' }
export enum PlayerRoleEnum { BATSMAN='BATSMAN', BOWLER='BOWLER', ALL_ROUNDER='ALL_ROUNDER', WICKET_KEEPER='WICKET_KEEPER' }
export enum BattingStyleEnum { RIGHT_HAND='RIGHT_HAND', LEFT_HAND='LEFT_HAND' }
export enum BowlingStyleEnum {
  RIGHT_ARM_FAST='RIGHT_ARM_FAST',
  RIGHT_ARM_MEDIUM='RIGHT_ARM_MEDIUM',
  RIGHT_ARM_OFF_SPIN='RIGHT_ARM_OFF_SPIN',
  RIGHT_ARM_LEG_SPIN='RIGHT_ARM_LEG_SPIN',
  LEFT_ARM_FAST='LEFT_ARM_FAST',
  LEFT_ARM_MEDIUM='LEFT_ARM_MEDIUM',
  LEFT_ARM_ORTHODOX='LEFT_ARM_ORTHODOX',
  LEFT_ARM_CHINAMAN='LEFT_ARM_CHINAMAN',
}

export class CreateProfileDto {
  @ApiProperty({ example: 'Rahul Sharma' })
  @IsString() @MaxLength(80)
  fullName!: string;

  @ApiProperty({ enum: GenderEnum, example: GenderEnum.MALE })
  @IsEnum(GenderEnum)
  gender!: GenderEnum;

  @ApiPropertyOptional({ example: '1998-09-15' })
  @IsOptional() @IsDateString()
  dob?: string;

  @ApiPropertyOptional({ example: 'India' }) @IsOptional() @IsString() country?: string;
  @ApiPropertyOptional({ example: 'Delhi' }) @IsOptional() @IsString() state?: string;
  @ApiPropertyOptional({ example: 'New Delhi' }) @IsOptional() @IsString() city?: string;
  @ApiPropertyOptional({ example: '110001' }) @IsOptional() @IsString() pincode?: string;

  @ApiProperty({ enum: PlayerRoleEnum, example: PlayerRoleEnum.ALL_ROUNDER })
  @IsEnum(PlayerRoleEnum)
  role!: PlayerRoleEnum;

  @ApiProperty({ enum: BattingStyleEnum, example: BattingStyleEnum.RIGHT_HAND })
  @IsEnum(BattingStyleEnum)
  battingStyle!: BattingStyleEnum;

  @ApiPropertyOptional({ enum: BowlingStyleEnum, example: BowlingStyleEnum.RIGHT_ARM_MEDIUM })
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

  @ApiPropertyOptional({ example: 'Opening batsman and medium pacer' })
  @IsOptional() @IsString() @MaxLength(200)
  bio?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatars/u1.png' })
  @IsOptional() @IsString()
  avatarUrl?: string;
}
