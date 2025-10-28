import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1) Authorization header: Bearer <refresh>
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // 2) X-Refresh-Token header
        (req) => req?.headers?.['x-refresh-token'] as string,
        // 3) Cookie (optional)
        (req) => req?.cookies?.['refresh_token'],
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    // Raw token useful for hash compare
    const refreshToken =
      ExtractJwt.fromAuthHeaderAsBearerToken()(req) ||
      (req.headers?.['x-refresh-token'] as string) ||
      (req.cookies?.['refresh_token'] as string);

    return { ...payload, refreshToken };
  }
}
