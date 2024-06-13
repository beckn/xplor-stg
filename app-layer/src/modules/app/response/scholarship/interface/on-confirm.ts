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
interface Person {
  name: string;
}

interface Contact {
  email: string;
}

interface Agent {
  person: Person;
  contact: Contact;
}

interface Descriptor {
  code: string;
  name: string;
}

interface ItemType {
  id: string;
}

interface Price {
  currency: string;
  value: string;
}

interface Billing {
  name: string;
  organization: BillingOrganization;
  address: string;
  phone: string;
}

interface BillingOrganization {
  descriptor: BillingOrganizationDescriptor;
  contact: Contact;
}

interface BillingOrganizationDescriptor {
  name: string;
  code: string;
}

interface Contact {
  phone: string;
  email: string;
}

interface Fulfillment {
  state: State;
  id: string;
  type: string;
  tracking: boolean;
  agent: Agent;
  customer: Customer;
}

interface State {
  descriptor: Descriptor;
  updated_at: string;
}

interface Agent {
  person: Person;
  contact: Contact;
}

interface Customer {
  id: string;
  person: Person;
  contact: Contact;
}

interface CancellationTerm {
  cancellation_fee: Amount;
}

interface Amount {
  currency: string;
  value: string;
}

interface Doc {
  descriptor: Descriptor;
  url: string;
  mime_type: string;
}

interface Payment {
  params: PaymentParams;
}

interface PaymentParams {
  bank_code: string;
  bank_account_number: string;
  bank_account_name: string;
}

interface Quote {
  price: Price;
  breakup: BreakupItem[];
}

interface BreakupItem {
  title: string;
  price: Price;
}

interface Provider {
  id: string;
}

export interface IScholarshipConfirmResponseMessageOrder {
  id: string;
  provider: Provider;
  items: ItemType[];
  billing?: Billing;
  fulfillments?: Fulfillment[];
  cancellation_terms?: CancellationTerm[];
  docs?: Doc[];
  payments?: Payment[];
  quote?: Quote;
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

export interface IScholarshipConfirmResponseMessage {
  order: IScholarshipConfirmResponseMessageOrder;
}

export interface IScholarshipConfirmResponse {
  context?: Context;
  message: IScholarshipConfirmResponseMessage;
}
