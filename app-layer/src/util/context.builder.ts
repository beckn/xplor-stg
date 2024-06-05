// Import necessary enums

import { Action, DomainsEnum } from '../common/constants/enums';

// Define the OnestContext interface for the Onest context
export interface OnestContext {
  domain: string; // Domain of the request
  country: string; // Country of the request
  city: string; // City of the request
  action: Action; // Action type of the request
  timestamp: Date; // Timestamp of the request
  version: string; // Version of the request
  bap_id: string; // BAP ID associated with the request
  bap_uri: string; // BAP URI associated with the request
  transaction_id: string; // Transaction ID of the request
  message_id: string; // Message ID of the request
  ttl: string; // Time to live for the request
}

// Define the OndcContext interface for the Ondc context
export interface OndcContext {
  domain: string; // Domain of the request
  country: string; // Country of the request
  city: string; // City of the request
  action: Action; // Action type of the request
  timestamp: Date; // Timestamp of the request
  core_version: string; // Core version of the request
  bap_id: string; // BAP ID associated with the request
  bap_uri: string; // BAP URI associated with the request
  transaction_id: string; // Transaction ID of the request
  message_id: string; // Message ID of the request
  ttl: string; // Time to live for the request
}

// Function to create an OnestContext object
export function CreateOnestContext(
  domain: DomainsEnum, // Domain of the request
  transaction_id: string, // Transaction ID of the request
  message_id: string, // Message ID of the request
  action: Action, // Action type of the request
  bap_id: string, // BAP ID associated with the request
  bap_uri: string, // BAP URI associated with the request
  country: string, // Country of the request
  city: string, // City of the request
): OnestContext {
  // Initialize a partial OnestContext object with the provided parameters
  const context: Partial<OnestContext> = {
    domain: domain,
    action: action,
    country: country,
    city: city,
    timestamp: new Date(), // Set the current timestamp
    version: '1.1.0', // Version of the request
    bap_id: bap_id,
    bap_uri: bap_uri,
    transaction_id: transaction_id,
    message_id: message_id,
    ttl: 'PT10M', // Time to live for the request
  };

  // Return the context object casted to OnestContext
  return context as OnestContext;
}

// Function to create an OndcContext object
export function CreateOndcContext(
  domain: DomainsEnum, // Domain of the request
  transaction_id: string, // Transaction ID of the request
  message_id: string, // Message ID of the request
  action: Action, // Action type of the request
  bap_id: string, // BAP ID associated with the request
  bap_uri: string, // BAP URI associated with the request
  country: string, // Country of the request
  city: string, // City of the request
): OndcContext {
  // Initialize a partial OndcContext object with the provided parameters
  const context: Partial<OndcContext> = {
    domain: domain,
    action: action,
    country: country,
    city: city,
    timestamp: new Date(), // Set the current timestamp
    core_version: '1.1.0', // Core version of the request
    bap_id: bap_id,
    bap_uri: bap_uri,
    transaction_id: transaction_id,
    message_id: message_id,
    ttl: 'PT10M', // Time to live for the request
  };

  // Return the context object casted to OndcContext
  return context as OndcContext;
}
