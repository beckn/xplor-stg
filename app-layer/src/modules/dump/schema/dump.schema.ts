import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Dump extends Document {
  @Prop({ default: () => `dump_${uuidv4()}` })
  _id: string;
  @Prop({ required: true })
  transaction_id: string;

  @Prop({ required: true })
  provider_id: string;

  @Prop({ type: Object, required: true })
  data: Record<string, any>;
}
export const DumpModel = Dump.name;
export type DumpDocument = Dump & Document;
export const DumpSchema = SchemaFactory.createForClass(Dump);
