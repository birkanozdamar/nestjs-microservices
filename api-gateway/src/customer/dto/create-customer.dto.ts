import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
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
    example: 'jhon a.s',
  })
  company: string;

  @ApiProperty({
    example: '+905334441133',
  })
  @IsString()
  phone: string;
}
