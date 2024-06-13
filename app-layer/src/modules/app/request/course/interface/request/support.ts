import { SelectContext } from '../context';

interface Support {
  order_id: string;
}

export interface IMessageSupport {
  support: Support;
}

export interface SupportRequest {
  context: SelectContext;
  message: IMessageSupport;
}
