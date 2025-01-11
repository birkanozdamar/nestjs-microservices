import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @MessagePattern({ cmd: 'get-user' }) // Mesajın komutu
  getUser(data: string): any {
    console.log(`Received user ID: ${data}`);
    return { id: data, name: 'John Doe', age: 30 };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
