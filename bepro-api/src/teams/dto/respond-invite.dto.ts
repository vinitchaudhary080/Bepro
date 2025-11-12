import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class RespondInviteDto {
  @ApiProperty({
    enum: ['accept', 'reject'],
    description: 'Action on invite',
  })
  @IsIn(['accept', 'reject'])
  action!: 'accept' | 'reject'; // 👈 fix: added !
}
