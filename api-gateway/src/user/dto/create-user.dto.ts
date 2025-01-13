import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
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
