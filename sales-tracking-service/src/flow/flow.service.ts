import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flow } from 'src/schemas/flow.schema';
import { Model } from 'mongoose';
import { FlowNote } from 'src/schemas/flow-note.schema';
import { CreateFlowDto } from './dto/create-flow.dto';
// import { Connection } from 'mongoose';
// import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class FlowService {
  constructor(
    @InjectModel(Flow.name)
    private flowModel: Model<Flow>,
    @InjectModel(FlowNote.name)
    private flowNote: Model<FlowNote>,
    // @InjectConnection() private readonly connection: Connection,
  ) {}

  async createFlow(
    created_by_id: number,
    createCustomerNoteDto: CreateFlowDto,
  ) {
    // const session = await this.connection.startSession();
    // şimdlik kaldırıldı docker ayarlanması gerekiyor
    try {
      // session.startTransaction();

      // Müşteriye ait aktif akışları deaktive ediyoruz
      await this.flowModel.updateMany(
        { customer_id: createCustomerNoteDto.customer_id, isActive: true },
        { $set: { isActive: false } },
      );

      // Yeni Flow kaydını oluşturuyoruz
      const newFlow = await new this.flowModel({
        created_by_id: created_by_id,
        customer_id: createCustomerNoteDto.customer_id,
      }).save();

      // Yeni FlowNote ekliyoruz
      await new this.flowNote({
        flowId: newFlow._id,
        created_by_id: created_by_id,
        content: createCustomerNoteDto.note,
      }).save();

      return { status: true, newFlow: newFlow };
    } catch (error) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }
}
