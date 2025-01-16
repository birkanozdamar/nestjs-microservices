import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlowStatusService } from './flow-status.service';

@Controller('flow-status')
export class FlowStatusController {
  constructor(private readonly flowStatusService: FlowStatusService) {}

  @MessagePattern({ cmd: 'getFlowStatuses' })
  async getFlowStatuses(@Payload() params: any) {
    console.log('asdasdasd');
    if (!params) {
      throw new Error('No parameters provided');
    }

    return await this.flowStatusService.getFlowStatuses(params);
  }
}
