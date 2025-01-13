import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UserServiceTCPConnectionSettings } from 'settings/settings';
import { ClientsModule } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ClientsModule.register([UserServiceTCPConnectionSettings])],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    UserService,
  ],
})
export class UserModule {}
