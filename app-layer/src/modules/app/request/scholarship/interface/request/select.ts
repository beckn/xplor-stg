import { Context } from '../context';

/**
 * Interface for a provider, which includes an ID.
 */
interface Provider {
  id: string;
}

/**
 * Interface for a fulfillment, which includes an ID.
 */
interface Fulfillment {
  id: string;
}

/**
 * Interface for an item, which includes an ID.
 */
interface Item {
  id: string;
}

/**
 * Interface for an order, which includes a provider and items.
 */
interface Order {
  provider: Provider;
  items: Item[];
  fulfillments?: Fulfillment[];
}

/**
 * Interface for a message, which includes an order.
 */
export interface IMessageSelect {
  order: Order;
}

/**
 * Interface for a job selection, including a context and a message.
 */
export interface IScholarshipSelect {
  context: Context;
  message: IMessageSelect;
}
