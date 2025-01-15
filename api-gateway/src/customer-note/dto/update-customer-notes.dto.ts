import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerNoteDto } from './create-customer-notes.dto';

export class UpdateCustomerNotesDto extends PartialType(CreateCustomerNoteDto) {
  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @ApiProperty({
    example: 'Super Bir Üye Buldum',
  })
  @IsString()
  @IsNotEmpty()
  customer_not: string;
}
