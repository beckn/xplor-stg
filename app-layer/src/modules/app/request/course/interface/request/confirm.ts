interface Context {
  domain: string;
  action: string;
  version: string;
  bap_uri: string;
  bap_id: string;
  transaction_id: string;
  message_id: string;
  timestamp: string;
  ttl: string;
  bpp_id: string;
  bpp_uri: string;
}

interface Billing {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface Item {
  id: string;
}

interface Provider {
  id: string;
}

// Alternatively, if you prefer a single interface for the entire structure:
interface Payment {
  params: {
    amount?: string;
    currency?: string;
  };
  status?: string;
}
interface Fulfillment {
  customer: {
    person: {
      name: string;
      age: string;
      gender: string;
      tags: Array<{
        descriptor: {
          code: string;
          name: string;
        };
        list: Array<{
          descriptor: {
            code: string;
            name: string;
          };
          value: string;
        }>;
        display: boolean;
      }>;
    };
    contact: {
      phone: string;
      email: string;
    };
  };
}

interface Order {
  provider: Provider;
  items: Item[];
  billing: Billing;
  fulfillments: Fulfillment[];
  payments: Payment[];
}

export interface ICourseConfirmMessage {
  order: Order;
}

export interface ICourseConfirmRequest {
  context: Context;
  message: ICourseConfirmMessage;
}
