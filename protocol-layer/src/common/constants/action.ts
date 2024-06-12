/**
 * Enum representing different actions that can be performed within the application.
 * Each action corresponds to a specific operation or event that the application can handle.
 */
export enum Action {
  search = 'search', // Trigger a search operation
  on_search = 'on_search', // Handle the result of a search operation
  select = 'select', // Trigger a select operation
  on_select = 'on_select', // Handle the result of a select operation
  init = 'init', // Initialize a process or component
  on_init = 'on_init', // Handle the initialization of a process or component
  confirm = 'confirm', // Confirm an action or process
  on_confirm = 'on_confirm', // Handle the confirmation of an action or process
  status = 'status', // Check the status of a process or component
  on_status = 'on_status', // Handle the status update of a process or component
  tracking = 'track', // Trigger a tracking operation
  on_tracking = 'on_track', // Handle the result of a tracking operation
  rating = 'rating', // Trigger a rating operation
  on_rating = 'on_rating', // Handle the result of a rating operation
  cancel = 'cancel', // Cancel an action or process
  on_cancel = 'on_cancel', // Handle the cancellation of an action or process
  update = 'update', // Update a process or component
  on_update = 'on_update', // Handle the updating of an action or process
  support = 'support', // Trigger a support operation
  on_support = 'on_support', // Handle the result of a support operation
}

// Define constants for response codes
export const NACK = 'NACK'; // Negative acknowledgment, indicating an error or failure
export const ACK = 'ACK'; // Positive acknowledgment, indicating success
export const CONTEXT_ERROR = 'CONTEXT_ERROR'; // Error code for context-related errors
export const ERROR_CODE_CONTEXT = '625519'; // Specific error code for context errors
