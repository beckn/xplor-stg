/**
 * Schemas for context objects used in the application.
 *
 * The `contextSchema` defines the structure for context objects that are used
 * across various parts of the application. It includes properties such as `domain`,
 * `action`, `version`, and identifiers like `bap_id`, `bap_uri`, `bpp_id`, and `bpp_uri`.
 * These properties are required for the application to process and route messages correctly.
 *
 * The `searchContextSchema` is a subset of the `contextSchema` and is specifically designed
 * for search operations within the application. It includes properties relevant to
 * searching and filtering data, such as `domain`, `action`, `version`, and identifiers.
 * This schema is used to validate the structure of context objects when performing search
 * operations, ensuring that the necessary information is present for effective searching.
 */
export const contextSchema = {
  type: 'object',
  properties: {
    domain: { type: 'string' },
    action: { type: 'string' },
    version: { type: 'string' },
    bap_id: { type: 'string' },
    bap_uri: { type: 'string' },
    bpp_id: { type: 'string' },
    bpp_uri: { type: 'string' },
    transaction_id: { type: 'string' },
    message_id: { type: 'string' },
    timestamp: { type: 'string' },
    ttl: { type: 'string' },
  },
  required: [
    'domain',
    'action',
    'version',
    'bap_id',
    'bap_uri',
    'bpp_id',
    'bpp_uri',
    'transaction_id',
    'message_id',
    'timestamp',
    'ttl',
  ],
};
export const searchContextSchema = {
  type: 'object',
  properties: {
    domain: { type: 'string' },
    action: { type: 'string' },
    version: { type: 'string' },
    bap_id: { type: 'string' },
    bap_uri: { type: 'string' },
    transaction_id: { type: 'string' },
    message_id: { type: 'string' },
    timestamp: { type: 'string' },
    ttl: { type: 'string' },
  },
  required: [
    'domain',
    'action',
    'version',
    'bap_id',
    'bap_uri',
    'transaction_id',
    'message_id',
    'timestamp',
    'ttl',
  ],
};
