import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get-user' })
  getUser(data: { id: string }) {
    return { id: data.id, name: 'John Doe', age: 30 };
  }
}
