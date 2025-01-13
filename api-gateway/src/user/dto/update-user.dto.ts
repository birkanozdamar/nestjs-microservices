import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2',
  })
  id: number;

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
  @IsEmail()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123456',
  })
  @MinLength(6)
  password: string;
}
