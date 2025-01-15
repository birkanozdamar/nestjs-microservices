import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCustomerNoteDto } from './create-customer-notes.dto';

export class UpdateCustomerNotesDto extends PartialType(CreateCustomerNoteDto) {
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @IsString()
  @IsNotEmpty()
  customer_not: string;
}
