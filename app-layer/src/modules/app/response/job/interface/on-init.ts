interface Image {
  url: string;
  size_type?: string;
}

interface Descriptor {
  name: string;
  short_desc?: string;
  long_desc?: string;
  images?: Image[];
  code?: string;
}

interface Category {
  id: string;
  descriptor: Descriptor;
}

interface Maximum {
  count: number;
}

interface Quantity {
  maximum: Maximum;
}

// interface Media {
//   url: string;
// }

interface Creator {
  descriptor: Descriptor;
}

interface Price {
  currency: string;
  value: string;
}

interface Head {
  descriptor: Descriptor;
  index: {
    min: number;
    cur: number;
    max: number;
  };
  headings: string[];
}

interface Form {
  mime_type: string;
  url: string;
  resubmit: boolean;
}

interface XInput {
  required: boolean;
  head: Head;
  form: Form;
}

interface Tag {
  descriptor: Descriptor;
  list: {
    descriptor: Descriptor;
    value: string;
  }[];
  display: boolean;
}

interface Item {
  id: string;
  quantity: Quantity;
  descriptor: Descriptor;
  creator: Creator;
  price: Price;
  category_ids: string[];
  fulfillment_ids: string[];
  rating: string;
  rateable: boolean;
  xinput: XInput;
  tags: Tag[];
}

interface Provider {
  id: string;
  descriptor: Descriptor;
  categories: Category[];
}

interface Person {
  name: string;
  age?: string;
  gender?: string;
  tags?: Tag[];
}

interface Contact {
  phone?: string;
  email: string;
}

interface Agent {
  person: Person;
  contact: Contact;
}

interface Customer {
  person: Person;
  contact: Contact;
}

interface Fulfillment {
  id: string;
  type: string;
  agent: Agent;
  customer: Customer;
}

interface QuotePrice {
  currency: string;
  value: string;
}

interface Quote {
  price: QuotePrice;
}

interface Billing {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface PaymentParams {
  amount: string;
  currency: string;
}

interface Payment {
  params: PaymentParams;
  url: string;
  type: string;
  status: string;
  collected_by: string;
}

interface Order {
  provider: Provider;
  items: Item[];
  fulfillments: Fulfillment[];
  quote: Quote;
  billing: Billing;
  payments: Payment[];
}

export interface ICourseInitMessage {
  order: Order;
}
