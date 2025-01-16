import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFlowDto } from './dto/create-flow.dto';
import {
  CreateFlowSalesTrackingServiceResponseType,
  GetFlowsSalesTrackingServiceResponseType,
} from 'constants/salesTrackingServiceResponseType';
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

  async getFlowStatuses(response: Response) {
    try {
      const { status, flows } = await this.salesTrackingServiceClient
        .send<GetFlowsSalesTrackingServiceResponseType>(
          { cmd: 'getFlows' },
          { someParam: 'value' }, // Beklenen parametreyi burada sağla
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Satış Durumları Bulunamadı!',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Satış Durumları!',
        flows: flows,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Satış Durumu Bulunamadı!',
      });
    }
  }
}
