import { Module } from '@nestjs/common';
import { FlowNotesService } from './flow-notes.service';
import { FlowNotesController } from './flow-notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowNote } from 'src/schemas/flow-note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlowNote.name,
        schema: FlowNote,
      },
    ]),
  ],
  providers: [FlowNotesService],
  controllers: [FlowNotesController],
})
export class FlowNotesModule {}
