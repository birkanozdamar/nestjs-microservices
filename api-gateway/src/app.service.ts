import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  async getUserFromService(userId: string): Promise<any> {
    console.log(`User id: ${userId}`);
    return this.userServiceClient
      .send({ cmd: 'get-user' }, { id: userId })
      .toPromise();
  }
}
