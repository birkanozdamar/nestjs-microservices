import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiBearerAuth()
@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Yeni Müşteri Oluşturma' })
  @ApiResponse({
    status: 200,
    description: 'customer creted has been succesfull',
  })
  @ApiResponse({
    status: 400,
    description: 'customer creted has been loggin unsuccessfull',
  })
  @Post()
  create(
    @Res() response: Response,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.customerService.create(createCustomerDto, response);
  }

  @Get('/:page/:limit/:sorting')
  async findAll(
    @Res() response: Response,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Param('sorting') sorting: [],
  ) {
    return this.customerService.findAll(response, page, limit, sorting);
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(response, id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') customerId: number,
    @Body() UpdateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(response, customerId, UpdateCustomerDto);
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.customerService.remove(response, id);
  }
}
