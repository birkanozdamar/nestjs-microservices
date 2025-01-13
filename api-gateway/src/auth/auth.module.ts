import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import {
  jwtSettings,
  ThrottlerModuleSettings,
  UserServiceTCPConnectionSettings,
} from 'settings/settings';
@Module({
  imports: [
    JwtModule.register(jwtSettings),
    ThrottlerModule.forRoot([ThrottlerModuleSettings]),
    ClientsModule.register([UserServiceTCPConnectionSettings]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}
