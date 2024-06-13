interface Image {
  url: string;
}

interface Location {
  id: string;
  city: string;
  state: string;
}

interface Descriptor {
  name: string;
  short_desc?: string;
  images?: Image[];
}

interface Price {
  currency: string;
  value: string;
}

interface TimeRange {
  start: string;
  end: string;
}

interface TagListValue {
  value: string;
}

interface TagDescriptor {
  code: string;
  name: string;
}

interface Tag {
  display: boolean;
  descriptor: TagDescriptor;
  list: TagListValue[];
}

interface FulfillmentAgentContact {
  email?: string;
}

interface FulfillmentAgentPerson {
  name?: string;
}

interface FulfillmentAgent {
  person?: FulfillmentAgentPerson;
  contact?: FulfillmentAgentContact;
}

interface Fulfillment {
  id: string;
  type?: string;
  tracking?: boolean;
  agent: FulfillmentAgent;
}

interface BreakupPrice {
  title: string;
  price: Price;
}

interface QuoteBreakup {
  breakup: BreakupPrice[];
}

interface MessageOrderItem {
  id: string;
  descriptor?: Descriptor;
  price?: Price;
  time?: {
    label: string;
    range: TimeRange;
  };
  rateable?: boolean;
  tags?: Tag[];
  location_ids?: string[];
  category_ids?: string[];
}

interface MessageOrderProvider {
  id: string;
  descriptor?: Descriptor;
  locations?: Location[];
  rateable?: boolean;
}

export interface IScholarshipSelectResponseMessageOrder {
  provider: MessageOrderProvider;
  items: MessageOrderItem[];
  fulfillments: Fulfillment[];
  quote: QuoteBreakup;
}

export interface IScholarshipSelectResponseMessage {
  order: IScholarshipSelectResponseMessageOrder;
}

export interface IScholarshipSelectMessage {
  message: IScholarshipSelectResponseMessage;
}
