import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFlowDto } from './dto/create-flow.dto';
import { FlowService } from './flow.service';

@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @MessagePattern({ cmd: 'createFlow' })
  create(
    @Payload()
    payload: {
      created_by_id: number;
      createFlowDto: CreateFlowDto;
    },
  ) {
    const { created_by_id, createFlowDto } = payload;

    return this.flowService.createFlow(created_by_id, createFlowDto);
  }

  @MessagePattern({ cmd: 'getFlows' })
  async getFlows(@Payload() params: any) {
    if (!params) {
      throw new Error('No parameters provided');
    }

    return await this.flowService.getFlows();
  }
}
