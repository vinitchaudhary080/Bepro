import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}) // dynamic secrets used at sign time
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensService, JwtStrategy, RtStrategy],
})
export class AuthModule {}
