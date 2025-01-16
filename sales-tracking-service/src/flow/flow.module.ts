import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flow, FlowSchema } from 'src/schemas/flow.schema';
import { FlowNote, FlowNoteSchema } from 'src/schemas/flow-note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Flow.name,
        schema: FlowSchema,
      },
      {
        name: FlowNote.name,
        schema: FlowNoteSchema,
      },
    ]),
  ],
  providers: [FlowService],
  controllers: [FlowController],
})
export class FlowModule {}
