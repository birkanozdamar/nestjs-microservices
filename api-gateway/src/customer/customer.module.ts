import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerServiceTCPConnectionSettings } from 'settings/settings';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([CustomerServiceTCPConnectionSettings])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
