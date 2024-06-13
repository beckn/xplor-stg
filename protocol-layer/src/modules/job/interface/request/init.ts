import { Context } from '../context';

interface Descriptor {
  code?: string;
  name: string;
}

interface Skill {
  name: string;
}

interface Language {
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
  skills: Skill[];
  languages: Language[];
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
}

interface Order {
  provider: {
    id: string;
  };
  items: Item[];
  fulfillments: Fulfillment[];
}

interface Message {
  order: Order;
}

export interface IJobInit {
  context: Context;
  message: Message;
}
