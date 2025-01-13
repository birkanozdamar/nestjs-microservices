import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  async loginUser(user: LoginUserDto): Promise<any> {
    try {
      const response = this.authServiceClient
        .send(
          { cmd: 'sign-check' },
          { email: user.email, password: user.password },
        )
        .toPromise();

      if (!response) {
        throw new UnauthorizedException('E-posta veya şifre hatalı!');
      }

      return { message: 'Giriş başarılı!', '' };
    } catch (error) {
      console.error(error);
    }
  }
}
