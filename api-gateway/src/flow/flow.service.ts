import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFlowDto } from './dto/create-flow.dto';
import { CreateFlowSalesTrackingServiceResponseType } from 'constants/salesTrackingServiceResponseType';
import { Response } from 'express';

@Injectable()
export class FlowService {
  constructor(
    @Inject('SALES_TRACKING_SERVICE')
    private readonly salesTrackingServiceClient: ClientProxy,
  ) {}

  async createCustomerNote(
    createFlowDto: CreateFlowDto,
    response: Response,
    request: Request,
  ) {
    try {
      const created_by_id = request['user'].id;
      const { status, newFlow } = await this.salesTrackingServiceClient
        .send<CreateFlowSalesTrackingServiceResponseType>(
          { cmd: 'createFlow' },
          { created_by_id, createFlowDto },
        )
        .toPromise();
      console.log('+++asdasdasd+++');
      console.log(newFlow);
      if (!status) {
        return response.status(HttpStatus.BAD_REQUEST).send({
          message: 'Müşteri Akışı Kayıt başarısız!',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Müşteri Akışı Kayıt Başarılı!',
        flow: newFlow,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Müşteri Akışı Kayıt başarısız!',
      });
    }
  }
}
