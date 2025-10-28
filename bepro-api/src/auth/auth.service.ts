import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly tokens: TokensService,
  ) {}

  async register(dto: RegisterDto) {
    return this.users.register(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.users.validateUser(dto.email, dto.password);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };

    const { accessToken, refreshToken } = await this.tokens.signTokens(payload);
    await this.users.setRefreshToken(user.id, refreshToken, true); // rotate version on login

    return {
      user: this.users.toSafe(user),
      tokens: { accessToken, refreshToken },
    };
  }

  async refresh(userFromRtStrategy: any) {
    const { sub: userId, tokenVersion, refreshToken } = userFromRtStrategy;
    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    const ok = await this.users.verifyStoredRefreshToken(userId, refreshToken);
    if (!ok) throw new UnauthorizedException('Invalid/expired refresh token');

    // Get fresh user (for updated tokenVersion after rotations)
    const fresh = await this.users['repo'].findById(userId);
    const payload = {
      sub: fresh!.id,
      email: fresh!.email,
      role: fresh!.role,
      tokenVersion: fresh!.tokenVersion,
    };

    const { accessToken, refreshToken: newRt } = await this.tokens.signTokens(payload);
    await this.users.setRefreshToken(fresh!.id, newRt, false); // rotate hash, keep version

    return {
      user: this.users.toSafe(fresh),
      tokens: { accessToken, refreshToken: newRt },
    };
  }

  async logout(userId: string) {
    await this.users.clearRefreshToken(userId);
    return { message: 'Logged out' };
  }
}
