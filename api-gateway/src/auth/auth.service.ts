import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInUserServiceResponseType } from '../../constants/userServiceResponseTypes';

import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly authServiceClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async loginUser(clientUser: LoginUserDto, response: Response): Promise<any> {
    try {
      console.log('asd');
      const { status, user } = await this.authServiceClient
        .send<SignInUserServiceResponseType>(
          { cmd: 'signCheck' },
          { email: clientUser.email, password: clientUser.password },
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Giriş başarısız!',
        });
      }

      const payload = { id: user.id, email: user.email };
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
