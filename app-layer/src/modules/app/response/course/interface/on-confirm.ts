interface Context {
  domain: string;
  version: string;
  action: string;
  bap_uri: string;
  bap_id: string;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: string;
}

interface Image {
  url: string;
  size_type?: string;
}

interface Media {
  mimetype?: string;
  url: string;
}

interface Descriptor {
  name: string;
  short_desc?: string;
  long_desc?: string;
  images?: Image[];
  media?: Media[];
}

interface Tag {
  descriptor: Descriptor;
  list: Array<{
    descriptor?: Descriptor;
    value: string;
  }>;
  display: boolean;
}

interface Item {
  id: string;
}

interface Price {
  currency: string;
  value: string | number;
}

interface FulfillmentState {
  descriptor: Descriptor;
  updated_at: string;
}

interface Agent {
  person?: {
    name: string;
  };
  contact?: {
    email: string;
  };
}

interface Customer {
  person: {
    name: string;
    age: string;
    gender: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

interface Stop {
  id: string;
  instructions: {
    name: string;
    long_desc: string;
    media: Media[];
  };
}

interface Fulfillment {
  state?: FulfillmentState;
  agent?: Agent;
  customer?: Customer;
  stops?: Stop[];
  tags?: Tag[];
}

export interface ICourseConfirmResponseMessageOrder {
  id: string;
  provider: {
    id: string;
  };
  items: Item[];
  fulfillments: Fulfillment[];
  quote: {
    price: Price;
  };
  billing: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  payments: Array<{
    params: {
      amount: string | number;
      currency: string;
    };
    type: string;
    status: string;
    collected_by: string;
  }>;
}

export interface ICourseConfirmResponseMessage {
  order: ICourseConfirmResponseMessageOrder;
}

export interface ICourseConfirmResponse {
  context?: Context;
  message: ICourseConfirmResponseMessage;
}
