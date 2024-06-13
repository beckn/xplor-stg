import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
@Schema({ timestamps: true })
export class Network extends Document {
  @Prop({ default: () => `network_${uuidv4()}` })
  _id: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  domains: string[]

  @Prop({ required: true })
  bap_uri: string

  @Prop({ required: true })
  bap_id: string

  @Prop({ required: true })
  callback_url: string

  @Prop({ required: true })
  registry_url: string
}

export const NetworkModel = Network.name
export type NetworkDocument = Network & Document
export const NetworkSchema = SchemaFactory.createForClass(Network)
