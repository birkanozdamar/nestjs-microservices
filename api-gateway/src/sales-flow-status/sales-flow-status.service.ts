import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetFlowStatusSalesTrackingServiceResponseType } from 'constants/salesTrackingServiceResponseType';
import { Response } from 'express';

@Injectable()
export class SalesFlowStatusService {
  constructor(
    @Inject('SALES_TRACKING_SERVICE')
    private readonly salesTrackingServiceClient: ClientProxy,
  ) {}

  async getFlowStatuses(response: Response) {
    try {
      const { status, flowStatuses } = await this.salesTrackingServiceClient
        .send<GetFlowStatusSalesTrackingServiceResponseType>(
          { cmd: 'getFlowStatuses' },
          { someParam: 'value' }, // Beklenen parametreyi burada sağla
        )
        .toPromise();

      console.log(flowStatuses);

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Satış Durumları Bulunamadı!',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Satış Durumları!',
        customerNotes: flowStatuses,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Satış Durumu Bulunamadı!',
      });
    }
  }
}
