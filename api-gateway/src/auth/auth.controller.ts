import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Kullanici Girisi' })
  @HttpCode(200)
  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'loggin succesfull',
  })
  @ApiResponse({
    status: 401,
    description: 'loggin unsuccessfull',
  })
  async loginUser(
    @Res() response: Response,
    @Body() user: LoginUserDto,
  ): Promise<any> {
    console.log('asdasd');
    return this.authService.loginUser(user, response);
  }
}
