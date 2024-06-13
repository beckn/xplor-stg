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
  customer?: {
    person: {
      name: string;
      gender: string;
      age: string;
      skills: { name: string }[];
      languages: { code: string; name: string }[];
      tags: Tag[];
    };
    contact: {
      phone: string;
      email: string;
    };
  };
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

interface Provider {
  descriptor: Descriptor;
  fulfillments: Fulfillment[];
  locations: Location[];
}

interface Order {
  provider: Provider;
  items: Item[];
  fulfillments?: Fulfillment[];
  type: string;
}

interface Message {
  order: Order;
}

export interface IJobOnInit {
  context: Context;
  message: Message;
}
