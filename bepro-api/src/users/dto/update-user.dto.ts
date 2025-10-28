import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Rahul Sharma', required: false })
  @IsOptional() @IsString() @MinLength(2)
  name?: string;

  @ApiProperty({ example: 'rahul.new@example.com', required: false })
  @IsOptional() @IsEmail()
  email?: string;

  @ApiProperty({ example: '+919812345678', required: false })
  @IsOptional() @IsString()
  phone?: string;
}
