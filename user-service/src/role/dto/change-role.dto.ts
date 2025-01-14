import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsEmail()
  role_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
