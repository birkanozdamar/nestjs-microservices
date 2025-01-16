import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlowModule } from './flow/flow.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowStatusModule } from './flow-status/flow-status.module';
import { FlowNotesModule } from './flow-notes/flow-notes.module';
import { FlowStatusSeeder } from './seeder/flow-status.seeder';
import { FlowStatus, FlowStatusSchema } from './schemas/flow-status.schema';
import { Flow, FlowSchema } from './schemas/flow.schema';
import { FlowNote, FlowNoteSchema } from './schemas/flow-note.schema';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@sales-tracking-mongo-db:27017/sales_tracking?authSource=admin`,
    ),
    MongooseModule.forFeature([
      { name: FlowStatus.name, schema: FlowStatusSchema },
      { name: Flow.name, schema: FlowSchema },
      { name: FlowNote.name, schema: FlowNoteSchema },
    ]),
    FlowModule,
    FlowStatusModule,
    FlowNotesModule,
  ],
  controllers: [AppController],
  providers: [AppService, FlowStatusSeeder],
})
export class AppModule {}
