import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'sign-check' })
  getUser() {
    return { id: 'asd', name: 'John Doe', age: 30 };
  }
}
