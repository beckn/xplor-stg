import { Context } from '../context';
interface Message {
  order_id: string;
}

export interface IJobStatus {
  context: Context;
  message: Message;
}
