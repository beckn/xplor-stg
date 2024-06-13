import { Context } from '../context';

interface Descriptor {
  name: string;
  code?: string;
}

interface Tag {
  descriptor: Descriptor;
  list: Array<{ descriptor?: Descriptor; value: string }>;
  display: boolean;
}

interface TimeRange {
  start: string;
  end: string;
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

interface DescriptorWithLongDesc extends Descriptor {
  long_desc?: string;
}

interface Item {
  id: string;
  descriptor: DescriptorWithLongDesc;
  fulfillment_ids: string[];
  location_ids: string[];
  time: {
    range: TimeRange;
  };
  tags: Tag[];
}

interface Person {
  name: string;
  gender: string;
  age: string;
  skills: { name: string }[];
  languages: { code: string; name: string }[];
  tags: Tag[];
}

interface Contact {
  phone: string;
  email: string;
}

interface Customer {
  person: Person;
  contact: Contact;
}

interface Fulfillment {
  id: string;
  customer: Customer;
}

interface Provider {
  descriptor: Descriptor;
  locations: Location[];
}

interface Order {
  id: string;
  provider: Provider;
  items: Item[];
  fulfillments: Fulfillment[];
}

interface Message {
  order: Order;
}

export interface IJobOnStatus {
  context: Context;
  message: Message;
}
