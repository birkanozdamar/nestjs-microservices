import { Module } from '@nestjs/common';
import { CustomerNotesService } from './customer-notes.service';
import { CustomerNotesController } from './customer-notes.controller';

@Module({
  providers: [CustomerNotesService],
  controllers: [CustomerNotesController],
})
export class CustomerNotesModule {}
