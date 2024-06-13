/**
 * Interface for the context of a request or operation.
 * It includes information relevant to the operation, such as the domain, action, version, BAP ID, BAP URI, transaction ID, message ID, timestamp, and TTL.
 */
export interface Context {
  domain: string;
  action: string;
  version: string;
  country?: string;
  city?: string;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  timestamp: string;
  ttl: string;
}
