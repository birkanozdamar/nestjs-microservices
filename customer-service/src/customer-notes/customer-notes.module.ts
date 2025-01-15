import { Module } from '@nestjs/common';
import { CustomerNotesService } from './customer-notes.service';
import { CustomerNotesController } from './customer-notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerNotes,
  CustomerNotesSchema,
} from './schemas/customer-schemas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerNotes.name,
        schema: CustomerNotesSchema,
      },
    ]),
  ],
  providers: [CustomerNotesService],
  controllers: [CustomerNotesController],
})
export class CustomerNotesModule {}
