import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { Request } from 'express';

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
    @Req() request: Request,
  ): Promise<any> {
    return this.authService.loginUser(user, response, request);
  }
}
