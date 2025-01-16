import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Flow extends Document {
  @Prop({ required: true })
  customer_id: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'FlowStatus' })
  flowStatusId: Types.ObjectId;

  @Prop({ required: true })
  created_by_id: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const FlowSchema = SchemaFactory.createForClass(Flow);
