import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flow } from 'src/schemas/flow.schema';
import { Model } from 'mongoose';
import { FlowNote } from 'src/schemas/flow-note.schema';
import { CreateFlowDto } from './dto/create-flow.dto';

@Injectable()
export class FlowService {
  constructor(
    @InjectModel(Flow.name)
    private flowModel: Model<Flow>,
    @InjectModel(FlowNote.name)
    private flowNote: Model<FlowNote>,
  ) {}

  async createFlow(
    created_by_id: number,
    createCustomerNoteDto: CreateFlowDto,
  ) {
    const session = await this.flowModel.db.startSession();
    session.startTransaction();

    try {
      // Müşteriye ait aktif akışları deaktive ediyoruz
      await this.flowModel.updateMany(
        { customer_id: createCustomerNoteDto.customer_id, isActive: true },
        { $set: { isActive: false } },
        { session },
      );

      // Yeni Flow kaydını oluşturuyoruz
      const newFlow = await new this.flowModel({
        created_by_id: created_by_id,
        customer_id: createCustomerNoteDto.customer_id,
      }).save({ session });

      // Yeni FlowNote ekliyoruz
      await new this.flowNote({
        flowId: newFlow._id,
        note: createCustomerNoteDto.note,
      }).save({ session });

      await session.commitTransaction();

      session.endSession();

      return { status: true, newFlow: newFlow };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw new Error(`Transaction failed: ${error.message}`);
    }
  }
}
