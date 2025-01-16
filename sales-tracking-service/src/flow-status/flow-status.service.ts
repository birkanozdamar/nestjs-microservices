import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlowStatus } from 'src/schemas/flow-status.schema';
import { Model } from 'mongoose';

@Injectable()
export class FlowStatusService {
  constructor(
    @InjectModel(FlowStatus.name)
    private flowStatusModel: Model<FlowStatus>,
  ) {}

  async getFlowStatuses(test: any) {
    const flowStatuses = await this.flowStatusModel.find();
    return { status: true, flowStatuses: flowStatuses };
  }
}
