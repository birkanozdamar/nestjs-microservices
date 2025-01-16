import { Module } from '@nestjs/common';
import { FlowStatusService } from './flow-status.service';
import { FlowStatusController } from './flow-status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowStatus, FlowStatusSchema } from 'src/schemas/flow-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlowStatus.name,
        schema: FlowStatusSchema,
      },
    ]),
  ],
  providers: [FlowStatusService],
  controllers: [FlowStatusController],
})
export class FlowStatusModule {}
