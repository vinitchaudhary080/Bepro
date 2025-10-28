import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '../auth/guards/access.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my profile' })
  me(@GetUser('sub') userId: string) {
    return this.users.getMe(userId);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update my profile' })
  update(@GetUser('sub') userId: string, @Body() dto: UpdateUserDto) {
    return this.users.updateMe(userId, dto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete my account' })
  remove(@GetUser('sub') userId: string) {
    return this.users.deleteMe(userId);
  }
}
