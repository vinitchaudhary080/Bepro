import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, IsString, IsOptional } from 'class-validator';

export class InviteMembersDto {
  @ApiProperty({
    type: [String],
    description: 'User IDs to invite to this team',
    example: ['user-id-1', 'user-id-2'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  userIds!: string[]; // 👈 fix: added !

  @ApiProperty({
    required: false,
    description: 'Optional note to attach to the invitation',
    example: 'Join for upcoming tournament season',
  })
  @IsOptional()
  @IsString()
  note?: string;
}
