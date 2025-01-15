import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'jhon@deo.com',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'jhon',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'birkan a.s',
  })
  company: string;

  @ApiProperty({
    example: '+905334441133',
  })
  @IsString()
  phone: string;
}
