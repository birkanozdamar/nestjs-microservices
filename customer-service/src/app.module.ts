import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from 'database/source/data-source.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => getConfig(),
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
