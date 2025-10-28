import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './guards/access.guard';
import { RefreshTokenGuard } from './guards/refresh.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user account' })
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login and receive access + refresh tokens' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh & get new access/refresh tokens' })
  @ApiHeader({ name: 'Authorization', required: false, description: 'Bearer <refreshToken> (option 1)' })
  @ApiHeader({ name: 'x-refresh-token', required: false, description: 'Plain refresh token (option 2)' })
  refresh(@GetUser() user: any) {
    return this.auth.refresh(user);
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Invalidate refresh token & logout' })
  @ApiBearerAuth()
  logout(@GetUser('sub') userId: string) {
    return this.auth.logout(userId);
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Get current user (requires access token)' })
  @ApiBearerAuth()
  me(@GetUser() user: any) {
    const { iat, exp, ...safe } = user;
    return safe;
  }
}
