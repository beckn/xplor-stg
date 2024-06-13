import { Context } from '../context';

interface Provider {
  id: string;
}

interface Item {
  id: string;
}

interface Order {
  provider: Provider;
  items: Item[];
}

export interface IJobSelectMessage {
  order: Order;
}

export interface IJobSelect {
  context: Context;
  message: IJobSelectMessage;
}
