import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class FlowNote extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Flow' })
  flowId: Types.ObjectId;

  @Prop({ required: true })
  created_by_id: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const FlowNoteSchema = SchemaFactory.createForClass(FlowNote);
