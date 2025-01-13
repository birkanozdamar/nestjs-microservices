import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInUserServiceResponse } from './constants/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly authServiceClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async loginUser(clientUser: LoginUserDto): Promise<any> {
    try {
      const { status, user } = await this.authServiceClient
        .send<SignInUserServiceResponse>(
          { cmd: 'sign-check' },
          { email: clientUser.email, password: clientUser.password },
        )
        .toPromise();

      if (!status) {
        return new UnauthorizedException();
      }

      const payload = { sub: user.id, email: user.email };
      console.log('asdasd333');
      return {
        message: 'Giriş başarılı!',
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      return UnauthorizedException;
      console.error(error);
    }
  }
}
