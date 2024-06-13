interface Location {
  city: {
    name: string;
    code: string;
  };
  country: {
    name: string;
    code: string;
  };
}

interface Context {
  domain: string;
  location: Location;
  action: string;
  version: string;
  bap_id: string;
  bap_uri: string;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  timestamp: string;
  ttl: string;
}

interface OrganizationDescriptor {
  name: string;
  code: string;
}

interface OrganizationContact {
  phone: string;
  email: string;
}

interface Organization {
  descriptor: OrganizationDescriptor;
  contact: OrganizationContact;
}

interface Billing {
  id?: string;
  name: string;
  organization: Organization;
  address: string;
  phone: string;
}

interface Payment {
  id?: string;
  params: {
    bank_code?: string;
    bank_account_number?: string;
    bank_account_name?: string;
  };
}

interface CustomerPerson {
  name: string;
  age: string;
  gender: string;
}

interface CustomerContact {
  phone: string;
  email: string;
}

interface Customer {
  id: string;
  person: CustomerPerson;
  contact: CustomerContact;
}

interface Fulfillment {
  id?: string;
  customer: Customer;
}

interface Item {
  id: string;
}

interface Order {
  items: Item[];
  provider: {
    id: string;
  };
  billing: Billing;
  fulfillments: Fulfillment[];
  payment: Payment[];
}

export interface IScholarshipConfirmMessage {
  order: Order;
}

export interface IScholarshipConfirm {
  context?: Context;
  message: IScholarshipConfirmMessage;
}
