import { ISelectContext } from '../context';

interface Provider {
  id: string;
}

interface Item {
  id: string;
}

interface fulfillment {
  id: string;
}

interface Order {
  provider: Provider;
  items: Item[];
  fulfillments: fulfillment[];
}

export interface ICourseSelectMessage {
  order: Order;
}

export interface ICourseSelect {
  context: ISelectContext;
  message: ICourseSelectMessage;
}
