import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerNoteDto {
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
