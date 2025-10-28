import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type Payload = { sub: string; email: string; role: string; tokenVersion: number };

@Injectable()
export class TokensService {
  constructor(private readonly jwt: JwtService) {}

  async signTokens(payload: Payload) {
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES || '900s',
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
    });

    return { accessToken, refreshToken };
  }
}
