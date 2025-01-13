import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 1, ttl: 10000 } })
  @Post('/login')
  async loginUser(@Body() user: LoginUserDto): Promise<any> {
    return this.authService.loginUser(user);
  }
}
