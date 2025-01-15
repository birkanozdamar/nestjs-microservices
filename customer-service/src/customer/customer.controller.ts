import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import PaginationDto from './dto/pagination.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: 'createCustomer' })
  create(@Payload() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @MessagePattern({ cmd: 'findAllCustomer' })
  async findAll(@Payload() findAllDto: PaginationDto) {
    const customers = await this.customerService.findAll(findAllDto);

    return {
      status: true,
      customers: customers,
      messages: 'Customers',
    };
  }

  @MessagePattern({ cmd: 'findOneCustomer' })
  async findOne(@Payload() payload: { id: number }) {
    const { id } = payload;
    const customer = await this.customerService.findOne(id);

    return {
      status: true,
      customer: customer,
      messages: 'Müşteri',
    };
  }

  @MessagePattern({ cmd: 'updateCustomer' })
  async update(
    @Payload() payload: { id: number; updateCustomerDto: UpdateCustomerDto },
  ) {
    const { id, updateCustomerDto } = payload;

    const user = await this.customerService.update(id, updateCustomerDto);

    return {
      status: true,
      user: user,
      messages: 'Kullanıcı Güncellendi',
    };
  }

  @MessagePattern({ cmd: 'removeCustomer' })
  async remove(@Payload() payload: { id: number }) {
    const { id } = payload;
    await this.customerService.remove(id);
    return {
      status: true,
      user: '',
      messages: 'Kullanıcı Silindi',
    };
  }
}
