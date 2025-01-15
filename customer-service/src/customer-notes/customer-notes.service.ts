import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerNotes } from './schemas/customer-schemas.schema';
import { CreateCustomerNoteDto } from './dto/create-customer-notes.dto';
import { UpdateCustomerNotesDto } from './dto/update-customer-notes.dto';
// import { Connection } from 'mysql2/typings/mysql/lib/Connection';

@Injectable()
export class CustomerNotesService {
  constructor(
    @InjectModel(CustomerNotes.name)
    private customerNotesModel: Model<CustomerNotes>,
  ) {}

  async createCustomerNote(
    created_by_id: number,
    createCustomerNoteDto: CreateCustomerNoteDto,
  ) {
    console.log(createCustomerNoteDto);
    const newCustomerNote = await new this.customerNotesModel({
      created_by_id: created_by_id,
      customer_id: createCustomerNoteDto.customer_id,
      customer_not: createCustomerNoteDto.customer_not,
    }).save();

    console.log(newCustomerNote);

    return { status: true, customerNote: newCustomerNote };
  }

  async getCustomerNotes(customer: { id: string }) {
    const customerNotes = await this.customerNotesModel.find({
      customer_id: customer.id,
    });
    return { status: true, customerNotes: customerNotes };
  }

  async updateCustomerNotes(
    customer_note_id: string,
    created_by_id: string,
    updateCustomerNotesDto: UpdateCustomerNotesDto,
  ) {
    return this.customerNotesModel.findByIdAndUpdate(
      customer_note_id,
      {
        created_by_id: created_by_id,
        customer_id: updateCustomerNotesDto.customer_id,
        customer_not: updateCustomerNotesDto.customer_not,
      },
      {
        new: true,
      },
    );
  }
}
