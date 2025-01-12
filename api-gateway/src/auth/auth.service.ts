import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  async loginUser({ email, password }: LoginUserDto): Promise<any> {
    return this.userServiceClient
      .send({ cmd: 'get-user' }, { email: email, password: password })
      .toPromise();
  }
}
