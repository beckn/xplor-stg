/**
 * Enum to define standard HTTP response messages.
 * Used throughout the application to standardize response messages.
 * This helps in maintaining consistency in the responses sent by the application
 * and makes it easier to handle responses in a uniform manner.
 */
export enum HttpResponseMessage {
  OK = 'OK', // Indicates a successful HTTP request
  BAD_REQUEST = 'Bad Request', // Indicates the request was malformed
  UNAUTHORIZED = 'Unauthorized', // Indicates the request requires user authentication
  FORBIDDEN = 'Forbidden', // Indicates the server understood the request but refuses to authorize it
  NOT_FOUND = 'Not Found', // Indicates the requested resource could not be found on the server
  INTERNAL_SERVER_ERROR = 'Internal Server Error', // Indicates an error occurred on the server
}

/**
 * Object containing predefined response messages for specific application events.
 * This is used to standardize the messages sent in response to certain actions or events,
 * ensuring consistency and clarity in the application's communication.
 */
export const coreResponseMessage = {
  searchSuccessResponse: 'Search event subscribed', // Message indicating successful subscription to a search event
  selectSuccessResponse: 'Select event subscribed', // Message indicating successful subscription to a search event
  initSuccessResponse: 'Init event subscribed', // Message indicating successful subscription to an init event
  confirmSuccessResponse: 'Confirm event subscribed',
  statusSuccessResponse: 'Status event subscribed', // Message indicating successful subscription to an init event
  trackSuccessResponse: 'Track event subscribed', // Message indicating successful subscription to an init event
  ratingSuccessResponse: 'Rating event subscribed', // Message indicating successful subscription to an init event
  cancelSuccessResponse: 'Cancel event subscribed', // Message indicating successful subscription to an init event
  updateSuccessResponse: 'Update event subscribed', // Message indicating successful subscription to an init event
  supportSuccessResponse: 'Support event subscribed', // Message indicating successful subscription to an init event
};
