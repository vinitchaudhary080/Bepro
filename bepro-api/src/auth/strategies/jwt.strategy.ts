import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
};

function fromXAccessHeader(req: any): string | null {
  const token = req?.headers?.['x-access-token'];
  return typeof token === 'string' && token.length > 0 ? token : null;
}

function fromCookie(req: any): string | null {
  const token = req?.cookies?.['access_token'];
  return typeof token === 'string' && token.length > 0 ? token : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      // Fail fast: easier to detect misconfig than 401 everywhere
      throw new Error('JWT_ACCESS_SECRET is not set');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer <access>
        (req) => fromXAccessHeader(req),
        (req) => fromCookie(req),
      ]),
      secretOrKey: secret,
      ignoreExpiration: false, // token expire hone par 401
    });
  }

  async validate(payload: JwtPayload) {
    // Basic sanity checks (defensive)
    if (!payload?.sub || !payload?.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // Ye object hi req.user ban jata hai (guards/controllers me accessible)
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      tokenVersion: payload.tokenVersion,
      iat: payload.iat,
      exp: payload.exp,
    };
  }
}
