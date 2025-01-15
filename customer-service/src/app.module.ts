import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from 'database/source/data-source.config';
import { CustomerNotesModule } from './customer-notes/customer-notes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@customer-mongo-db:27017/customer_mongo_db?authSource=admin`,
    ),
    TypeOrmModule.forRootAsync({
      useFactory: () => getConfig(),
    }),
    CustomerModule,
    CustomerNotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
