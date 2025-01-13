import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
