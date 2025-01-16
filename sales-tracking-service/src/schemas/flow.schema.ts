import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Flow extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Status' })
  statusId: Types.ObjectId;
}

export const FlowSchema = SchemaFactory.createForClass(Flow);
