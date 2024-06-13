import { Context } from '../context';

interface Descriptor {
  name: string;
  short_desc?: string;
  images?: Array<{ url: string }>;
  long_desc?: string;
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
}

interface Provider {
  id: string;
  descriptor: Descriptor;
  fulfillments: Fulfillment[];
  locations: Location[];
  items: Array<{
    id: string;
    descriptor: Descriptor;
    location_ids: string[];
    fulfillment_ids: string[];
  }>;
}

interface Catalog {
  descriptor: Descriptor;
  payments: any[]; // Assuming payments is an array, replace 'any' with a more specific type if available
  providers: Provider[];
}

interface Message {
  catalog: Catalog;
}

export interface IJobOnSearch {
  context: Context;
  message: Message;
}
