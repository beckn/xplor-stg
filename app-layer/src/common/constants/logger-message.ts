/**
 * Object containing configuration for logger messages.
 * Used to standardize the naming and identification of different types of loggers
 * within the application, ensuring consistency in logging practices.
 */
export const LoggerMessage = {
  serviceName: 'STG', // Name of the service for logging purposes
  requestInterceptorName: 'REQUEST_INTERCEPTOR', // Name of the request interceptor for logging
  responseInterceptorName: 'RESPONSE_INTERCEPTOR', // Name of the response interceptor for logging
  errorInterceptorName: 'ERROR_INTERCEPTOR', // Name of the error interceptor for logging
};

/**
 * Object defining the endpoints for different types of logging.
 * Used to direct log messages to the appropriate endpoint based on their severity or type.
 */
export const LoggerEndpoints = {
  debug: '/debug', // Endpoint for debug logs
  error: '/error', // Endpoint for error logs
  info: '/info', // Endpoint for informational logs
  warn: 'warn', // Endpoint for warning logs
  verbose: '/verbose', // Endpoint for verbose logs
  log: '/log', // Endpoint for general logs
};

/**
 * Object containing predefined messages for different types of HTTP requests.
 * These messages are used to standardize the error messages sent in response to failed requests,
 * ensuring consistency and clarity in the application's communication.
 */
export const InternalMessages = {
  GET_REQUEST: 'Error in GET request:', // Message for failed GET requests
  POST_REQUEST: 'Error in POST request:', // Message for failed POST requests
  PUT_REQUEST: 'Error in PUT request:', // Message for failed PUT requests
  DELETE_REQUEST: 'Error in DELETE request:', // Message for failed DELETE requests
};
