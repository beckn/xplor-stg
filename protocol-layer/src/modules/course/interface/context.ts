export interface Context {
  domain: string;
  action: string;
  version: string;
  bap_id: string;
  bap_uri: string;

  transaction_id: string;
  message_id: string;
  timestamp: string;
  ttl: string;
}
export interface ISelectContext {
  domain: string;
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
