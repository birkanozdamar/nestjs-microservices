import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import {
  CreateCustomerNoteServiceResponseType,
  GetCustomerNotesServiceResponseType,
  UpdateCustomerNoteServiceResponseType,
} from 'constants/customerServiceResponseType';
import { CreateCustomerNoteDto } from 'src/customer-note/dto/create-customer-notes.dto';
import { UpdateCustomerNotesDto } from './dto/update-customer-notes.dto';

@Injectable()
export class CustomerNoteService {
  constructor(
    @Inject('CUSTOMER_SERVICE')
    private readonly customerServiceClient: ClientProxy,
  ) {}

  async createCustomerNote(
    createCustomerNoteDto: CreateCustomerNoteDto,
    response: Response,
    request: Request,
  ) {
    try {
      const created_by_id = request['user'].id;
      const { status, customerNote } = await this.customerServiceClient
        .send<CreateCustomerNoteServiceResponseType>(
          { cmd: 'createCustomerNote' },
          { created_by_id, createCustomerNoteDto },
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.BAD_REQUEST).send({
          message: 'Müşteri Notu Kayıt başarısız!',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Müşteri Notu Kayıt Başarılı!',
        customerNote: customerNote,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Müşteri Notu Kayıt başarısız!',
      });
    }
  }
  async getCustomerNote(customer: { id: number }, response: Response) {
    try {
      const { status, customerNotes } = await this.customerServiceClient
        .send<GetCustomerNotesServiceResponseType>(
          { cmd: 'getCustomerNotes' },
          { id: customer.id },
        )
        .toPromise();


      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Müşteri Notları Bulunamadı!',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Müşteri Notları!',
        customerNotes: customerNotes,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Müşteri Notu Bulunamadı!',
      });
    }
  }

  async updateCustomerNote(
    request: Request,
    response: Response,
    customer_note_id: string,
    updateCustomerNotesDto: UpdateCustomerNotesDto,
  ) {
    try {
      const created_by_id = request['user'].id;
      const { status, customerNote } = await this.customerServiceClient
        .send<UpdateCustomerNoteServiceResponseType>(
          { cmd: 'updateCustomerNotes' },
          { customer_note_id, created_by_id, updateCustomerNotesDto },
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Müşteri Notu değiştirlemedi',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Müşteri Notu!',
        customer: customerNote,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'İşlem Başarısız!',
      });
    }
  }
}
