import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from 'database/source/data-source.config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => getConfig(),
    }),
    UserModule,
  ],
})
export class AppModule {}
