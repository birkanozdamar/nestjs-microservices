import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerNoteDto {
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @IsString()
  @IsOptional()
  customer_not?: string;
}
