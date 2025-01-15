import { Module } from '@nestjs/common';
import { CustomerNoteService } from './customer-note.service';
import { CustomerNoteController } from './customer-note.controller';
import { ClientsModule } from '@nestjs/microservices';
import { CustomerServiceTCPConnectionSettings } from 'settings/settings';

@Module({
  imports: [ClientsModule.register([CustomerServiceTCPConnectionSettings])],
  providers: [CustomerNoteService],
  controllers: [CustomerNoteController],
})
export class CustomerNoteModule {}
