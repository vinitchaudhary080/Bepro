import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
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

  @Get()
  @ApiOperation({ summary: 'List users on platform for team invitations' })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Optional search text for filtering by name, email or phone',
  })
  listUsers(
    @GetUser('sub') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    return this.users.listUsersForInvite(userId, { page, limit, search });
  }

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
