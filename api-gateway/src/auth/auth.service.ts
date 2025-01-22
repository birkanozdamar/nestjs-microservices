import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInUserServiceResponseType } from '../../constants/userServiceResponseTypes';

import { Request, Response } from 'express';
import { getSHA512Hash } from 'src/util/sha512.hash';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly authServiceClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async loginUser(
    clientUser: LoginUserDto,
    response: Response,
    request: Request,
  ): Promise<any> {
    try {
      const { status, user } = await this.authServiceClient
        .send<SignInUserServiceResponseType>(
          { cmd: 'signCheck' },
          { email: clientUser.email, password: clientUser.password },
        )
        .toPromise();

      if (!status) {
        throw new UnauthorizedException('Giriş Başarısız1');
      }

      const ip =
        request.headers['x-forwarded-for'] || request.socket.remoteAddress;
      const userAgent = request.headers['user-agent'];

      const payload = {
        email: user.email,
        fingerprint: getSHA512Hash(`${ip}${userAgent}`),
      };

      return response.status(HttpStatus.OK).send({
        message: 'Giriş başarılı!',
        access_token: await this.jwtService.sign(payload),
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.UNAUTHORIZED).send({
        message: 'Giriş başarısız!',
      });
    }
  }
}
