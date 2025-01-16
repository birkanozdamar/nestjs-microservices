import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FlowStatus extends Document {
  @Prop({ required: true })
  name: string;
}

export const FlowStatusSchema = SchemaFactory.createForClass(FlowStatus);
