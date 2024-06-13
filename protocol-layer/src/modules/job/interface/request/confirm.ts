import { Context } from '../context';

interface Descriptor {
  code: string;
  name: string;
}

interface ListItem {
  descriptor: Descriptor;
  value: string;
}

interface Tag {
  code: string;
  list: ListItem[];
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

interface Item {
  id: string;
  fulfillment_ids: string[];
}

interface Provider {
  id: string;
}

interface Order {
  provider: Provider;
  items: Item[];
  fulfillments: Fulfillment[];
}

interface Message {
  order: Order;
}

export interface IJobConfirm {
  context: Context;
  message: Message;
}
