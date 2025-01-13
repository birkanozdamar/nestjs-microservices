import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'superadmin@birkan.com',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'SuperAdmin123!',
  })
  @MinLength(6)
  password: string;
}
