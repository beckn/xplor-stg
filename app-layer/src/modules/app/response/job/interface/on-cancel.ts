interface ProviderDescriptor {
  name: string;
  short_desc: string;
  images: Image[];
}

interface Image {
  url: string;
  size_type?: string;
}

interface CategoryDescriptor {
  code: string;
  name: string;
}

interface Category {
  id: string;
  descriptor: CategoryDescriptor;
}

interface ItemQuantity {
  maximum: {
    count: number;
  };
}

interface ItemDescriptor {
  name: string;
  short_desc: string;
  long_desc: string;
  images: Image[];
  media: Media[];
}

interface Media {
  url: string;
  mimetype?: string;
}

interface CreatorDescriptor {
  name: string;
  short_desc: string;
  long_desc: string;
  images: Image[];
}

interface Creator {
  descriptor: CreatorDescriptor;
}

interface Price {
  currency: string;
  value: string;
}

interface AddOnDescriptor {
  name: string;
  long_desc: string;
  media: Media[];
}

interface AddOn {
  id: string;
  descriptor: AddOnDescriptor;
}

interface TagDescriptor {
  code: string;
  name: string;
}

interface Tag {
  descriptor: TagDescriptor;
  list: TagValue[];
}

interface TagValue {
  descriptor: TagDescriptor;
  value: string;
}

interface Item {
  id: string;
  quantity: ItemQuantity;
  descriptor: ItemDescriptor;
  creator: Creator;
  price: Price;
  category_ids: string[];
  fulfillment_ids: string[];
  rating: string;
  rateable: boolean;
  add_ons: AddOn[];
  tags: Tag[];
}

interface FulfillmentStateDescriptor {
  code: string;
  name: string;
}

interface FulfillmentState {
  descriptor: FulfillmentStateDescriptor;
  updated_at: string;
}

interface FulfillmentAgentPerson {
  name: string;
}

interface FulfillmentAgentContact {
  email: string;
}

interface FulfillmentAgent {
  person: FulfillmentAgentPerson;
  contact: FulfillmentAgentContact;
}

interface CustomerPerson {
  name: string;
  age: string;
  gender: string;
  tags: Tag[];
}

interface CustomerContact {
  phone: string;
  email: string;
}

interface Customer {
  person: CustomerPerson;
  contact: CustomerContact;
}

interface StopInstructions {
  name: string;
  long_desc: string;
  media: Media[];
}

interface Stop {
  id: string;
  instructions: StopInstructions;
}

interface Fulfillment {
  id: string;
  type: string;
  state: FulfillmentState;
  agent: FulfillmentAgent;
  customer: Customer;
  stops: Stop[];
  tags: Tag[];
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
  type: string;
  status: string;
  collected_by: string;
}

interface Order {
  id: string;
  provider: Provider;
  items: Item[];
  fulfillments: Fulfillment[];
  quote: Quote;
  billing: Billing;
  payments: Payment[];
}

interface Provider {
  id: string;
  descriptor: ProviderDescriptor;
  categories: Category[];
}

export interface ICourseCancelMessage {
  order: Order;
}
