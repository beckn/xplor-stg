import { Context } from '../context';

export interface ICourseSupportMessage {
  order_id: string;
}

// Top-level interface combining Context and Message
export interface ISupportRequest {
  context: Context;
  message: ICourseSupportMessage;
}
