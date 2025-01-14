import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInUserServiceResponse } from './constants/constants';

import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly authServiceClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async loginUser(clientUser: LoginUserDto, response: Response): Promise<any> {
    try {
      console.log(clientUser);
      const { status, user } = await this.authServiceClient
        .send<SignInUserServiceResponse>(
          { cmd: 'signCheck' },
          { email: clientUser.email, password: clientUser.password },
        )
        .toPromise();
      console.log(user);
      if (!status) {
        return response.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Giriş başarısız!',
        });
      }

      const payload = { sub: user.id, email: user.email };
      return response.status(HttpStatus.OK).send({
        message: 'Giriş başarılı!',
        access_token: await this.jwtService.signAsync(payload),
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.UNAUTHORIZED).send({
        message: 'Giriş başarısız!',
      });
    }
  }
}
