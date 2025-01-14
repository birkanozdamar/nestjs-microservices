import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { ClientsModule } from '@nestjs/microservices';
import { UserServiceTCPConnectionSettings } from 'settings/settings';
// import { APP_GUARD } from '@nestjs/core';
// import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [ClientsModule.register([UserServiceTCPConnectionSettings])],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    RoleService,
  ],
  controllers: [RoleController],
})
export class RoleModule {}
