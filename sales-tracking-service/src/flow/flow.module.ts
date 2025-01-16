import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flow, FlowSchema } from 'src/schemas/flow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Flow.name,
        schema: FlowSchema,
      },
    ]),
  ],
  providers: [FlowService],
  controllers: [FlowController],
})
export class FlowModule {}
