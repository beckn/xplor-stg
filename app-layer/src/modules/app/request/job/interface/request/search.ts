import { Context } from '../context';

/**
 * Interface for a descriptor, which can optionally include a code and must include a name.
 */
interface Descriptor {
  code?: string;
  name: string;
}

/**
 * Interface for an item, which includes a descriptor.
 */
interface Item {
  descriptor: Descriptor;
}

/**
 * Interface for an intent, which includes an item.
 */
interface Intent {
  item: Item;
}

/**
 * Interface for a message, which includes an intent.
 */
export interface Message {
  intent: Intent;
}

/**
 * Interface for a job search, which includes an optional gateway URL, a context, and a message.
 */
export interface IJobSearch {
  gatewayUrl?: string;
  context: Context;
  message: Message;
}
