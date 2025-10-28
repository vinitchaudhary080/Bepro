import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EndInningsDto {
  @ApiProperty({ example: 'INNINGS_ID' })
  @IsString() inningsId!: string;
}
