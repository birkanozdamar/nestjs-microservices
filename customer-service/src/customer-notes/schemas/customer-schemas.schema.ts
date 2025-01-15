import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerNotesSchemasDocument = HydratedDocument<CustomerNotes>;

@Schema()
export class CustomerNotes {
  @Prop({ required: true })
  customer_id: string;

  @Prop({ required: true })
  customer_not: string;

  @Prop({ required: true })
  created_by_id: string;
}

export const CustomerNotesSchema = SchemaFactory.createForClass(CustomerNotes);
