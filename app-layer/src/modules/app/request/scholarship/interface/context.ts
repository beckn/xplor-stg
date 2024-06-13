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

/**
 * Interface representing the context of a select operation.
 * It includes essential details such as domain, action, version, identifiers (BAP ID, BAP URI, BPP ID), transactional information (transaction ID, message ID), timing (timestamp, TTL).
 *
 * @example
 * const selectContext: SelectContext = {
 *   domain: 'exampleDomain',
 *   action: 'selectAction',
 *   version: '1.0',
 *   bap_id: 'bapIdValue',
 *   bap_uri: 'http://example.com/bapUri',
 *   bpp_id: 'bppIdValue',
 *   transaction_id: 'transaction_idValue',
 *   message_id: 'message_idValue',
 *   timestamp: '2023-04-01T00:00:00Z',
 *   ttl: '3600'
 * };
 */
export interface ISelectContext {
  domain: string; // Domain identifier for the operation
  action: string; // Action being performed
  version: string; // Version of the operation
  bap_id: string; // Beckn Application Platform Identifier
  bap_uri: string; // Beckn Application Platform URI
  bpp_id: string; // Beckn Provider Platform Identifier
  bpp_uri: string; // Beckn Provider Platform Identifier
  transaction_id: string; // Transaction identifier
  message_id: string; // Message identifier
  timestamp: string; // Timestamp of the operation
  ttl: string; // Time-to-live value in seconds
}
