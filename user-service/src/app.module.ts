import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from 'database/source/data-source.config';
import { RoleModule } from './role/role.module';
import { RoleToUserModule } from './role-to-user/role-to-user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => getConfig(),
    }),
    UserModule,
    RoleModule,
    RoleToUserModule,
  ],
})
export class AppModule {}
