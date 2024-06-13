import { Context } from '../context';

interface Descriptor {
  code?: string;
  name: string;
}

interface Item {
  descriptor: Descriptor;
}

interface Intent {
  item: Item;
}

interface Message {
  intent: Intent;
}

export interface IJobSearch {
  context: Context;
  message: Message;
}
