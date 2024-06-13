import { Context } from '../context';

interface Descriptor {
  name: string;
  code?: string;
}

interface Range {
  start: string;
  end: string;
}

interface Time {
  range: Range;
}

interface ListItem {
  descriptor?: Descriptor;
  value: string;
}

interface Tag {
  descriptor: Descriptor;
  list: ListItem[];
  display: boolean;
}

interface Item {
  id: string;
  descriptor: Descriptor;
  long_desc?: string;
  fulfillment_ids: string[];
  location_ids: string[];
  time: Time;
  tags: Tag[];
}

interface Location {
  id: string;
  city: {
    name: string;
    code: string;
  };
  state: {
    name: string;
    code: string;
  };
}

interface Fulfillment {
  id: string;
  type: string;
}

interface Provider {
  descriptor: Descriptor;
  fulfillments: Fulfillment[];
  locations: Location[];
}

interface Order {
  provider: Provider;
  items: Item[];
  type: string;
}

export interface IOnSelectMessage {
  order: Order;
}

export interface IJobOnSelect {
  context: Context;
  message: IOnSelectMessage;
}
