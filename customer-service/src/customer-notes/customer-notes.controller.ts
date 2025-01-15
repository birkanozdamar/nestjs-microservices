import { Controller } from '@nestjs/common';
import { CustomerNotesService } from './customer-notes.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCustomerNoteDto } from './dto/create-customer-notes.dto';
import { UpdateCustomerNotesDto } from './dto/update-customer-notes.dto';

@Controller('customer-notes')
export class CustomerNotesController {
  constructor(private readonly customerNotesService: CustomerNotesService) {}

  @MessagePattern({ cmd: 'createCustomerNote' })
  create(
    @Payload()
    payload: {
      created_by_id: number;
      createCustomerNoteDto: CreateCustomerNoteDto;
    },
  ) {
    const { created_by_id, createCustomerNoteDto } = payload;

    return this.customerNotesService.createCustomerNote(
      created_by_id,
      createCustomerNoteDto,
    );
  }

  @MessagePattern({ cmd: 'getCustomerNotes' })
  async getCustomerNotes(@Payload() customer: { id: string }) {
    return await this.customerNotesService.getCustomerNotes(customer);
  }

  @MessagePattern({ cmd: 'updateCustomerNotes' })
  async updateCustomerNotes(
    @Payload()
    payload: {
      customer_note_id: string;
      created_by_id: string;
      updateCustomerNotesDto: UpdateCustomerNotesDto;
    },
  ) {
    const { customer_note_id, created_by_id, updateCustomerNotesDto } = payload;
    console.log(payload);
    const customerNote = await this.customerNotesService.updateCustomerNotes(
      customer_note_id,
      created_by_id,
      updateCustomerNotesDto,
    );

    return {
      status: true,
      customerNote: customerNote,
      messages: 'Kullanıcı Güncellendi',
    };
  }
}
