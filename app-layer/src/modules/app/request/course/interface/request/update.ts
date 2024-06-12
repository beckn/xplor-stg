interface Person {
  name: string;
}

interface Customer {
  person: Person;
}

interface Fulfillment {
  customer: Customer;
}

interface Order {
  fulfillments: Fulfillment[];
  id: string; // Using string to accommodate placeholders like "{{order_id}}"
}

export interface IMessageUpdate {
  update_target: string;
  order: Order;
}

interface Context {
  domain: string;
  version: string;
  action: string;
  bap_id: string;
  bap_uri: string;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: string; // Assuming ISO 8601 format for dates
}

export interface UpdateRequest {
  context: Context;
  message: IMessageUpdate;
}
