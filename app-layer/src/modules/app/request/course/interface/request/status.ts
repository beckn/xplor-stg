import { Context } from '../context';

/**
 * Interface for a message, which includes an order ID.
 */
interface Message {
  order_id: string;
}

export interface IMessageStatus {
  order_id: string;
}

// interface Order {
//   order_id: string;
// }
/**
 * Interface for a job status, including a context and a message.
 */
export interface IJobStatus {
  context: Context;
  message: Message;
}
