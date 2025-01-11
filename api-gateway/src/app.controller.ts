import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUser(@Query('id') id: string): Promise<any> {
    return this.appService.getUserFromService(id);
  }
}
