import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { CreateCustomerDto } from './dto/create-customer.dto';
import {
  CreateCustomerServiceResponseType,
  FindAllCustomerServiceResponseType,
  FindCustomerServiceResponseType,
  SortOrder,
} from 'constants/customerServiceResponseType';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_SERVICE')
    private readonly customerServiceClient: ClientProxy,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, response: Response) {
    try {
      const { status, customer } = await this.customerServiceClient
        .send<CreateCustomerServiceResponseType>(
          { cmd: 'createCustomer' },
          createCustomerDto,
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.BAD_REQUEST).send({
          message: 'Müşteri Kayıt başarısız!',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Müşteri Kayıt Başarılı!',
        customer: customer,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Müşteri Kayıt başarısız!',
      });
    }
  }

  async findAll(
    response: Response,
    page: number,
    limit: number,
    order: SortOrder,
  ) {
    try {
      const { status, customers } = await this.customerServiceClient
        .send<FindAllCustomerServiceResponseType>(
          { cmd: 'findAllCustomer' },
          { page, limit, order },
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Müşteri bulunamadı',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Müşteriler!',
        customers: customers,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Kullanıcı Kayıt başarısız!',
      });
    }
  }

  async findOne(response: Response, id: number) {
    try {
      const { status, customer } = await this.customerServiceClient
        .send<FindCustomerServiceResponseType>(
          { cmd: 'findOneCustomer' },
          { id },
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Müşteri bulunamadı',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'kullanıcı!',
        customer: customer,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'İşlem Başarısız!',
      });
    }
  }

  async update(
    response: Response,
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ) {
    try {
      const { status, customer } = await this.customerServiceClient
        .send<FindCustomerServiceResponseType>(
          { cmd: 'updateCustomer' },
          { id, updateCustomerDto },
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Müşteri bulunamadı',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'kullanıcı!',
        customer: customer,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'İşlem Başarısız!',
      });
    }
  }

  async remove(response: Response, id: number) {
    try {
      const { status, customer } = await this.customerServiceClient
        .send<FindCustomerServiceResponseType>(
          { cmd: 'removeCustomer' },
          { id },
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Müşteri silinemedi',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'müşteri silindi!',
        customer: customer,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'İşlem Başarısız!',
      });
    }
  }
}
