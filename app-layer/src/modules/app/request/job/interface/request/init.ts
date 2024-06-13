import { Context } from '../context';

/**
 * Interface for a descriptor, which can optionally include a code and must include a name.
 */
interface Descriptor {
  code?: string;
  name: string;
}

/**
 * Interface for a skill, which includes a name.
 */
interface Skill {
  name: string;
}

/**
 * Interface for a language, which includes a code and a name.
 */
interface Language {
  code: string;
  name: string;
}

/**
 * Interface for a list item, which includes a descriptor and a value.
 */
interface ListItem {
  descriptor: Descriptor;
  value: string;
}

/**
 * Interface for a tag, which includes a code and a list of list items.
 */
interface Tag {
  code: string;
  list: ListItem[];
}

/**
 * Interface for a person, including name, gender, age, skills, languages, and tags.
 */
interface Person {
  name: string;
  gender: string;
  age: string;
  skills: Skill[];
  languages: Language[];
  tags: Tag[];
}

/**
 * Interface for a contact, including phone and email.
 */
interface Contact {
  phone: string;
  email: string;
}

/**
 * Interface for a customer, including a person and contact.
 */
interface Customer {
  person: Person;
  contact: Contact;
}

/**
 * Interface for a fulfillment, including an ID and a customer.
 */
interface Fulfillment {
  id: string;
  customer: Customer;
}

/**
 * Interface for an item, including an ID.
 */
interface Item {
  id: string;
}

/**
 * Interface for an order, including a provider, items, and fulfillments.
 */
interface Order {
  provider: {
    id: string;
  };
  items: Item[];
  fulfillments: Fulfillment[];
}

/**
 * Interface for a job order.
 */
interface Message {
  order: Order;
}

/**
 * Interface for a job initialization message, including a context and a message.
 */
export interface IJobInit {
  context: Context;
  message: Message;
}