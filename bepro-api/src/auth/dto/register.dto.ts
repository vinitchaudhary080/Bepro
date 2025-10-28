import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Rahul Sharma' })
  @IsString() @MinLength(2)
  name!: string;

  @ApiProperty({ example: 'rahul@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPass@123' })
  @IsString() @MinLength(8)
  password!: string;

  @ApiProperty({ example: '+919876543210', required: false })
  @IsOptional() @IsString()
  phone?: string;
}
