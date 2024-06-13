// Define a configuration object for logger messages
export const LoggerMessage = {
  serviceName: 'STG', // Name of the service for logging purposes
  requestInterceptorName: 'REQUEST_INTERCEPTOR', // Name of the request interceptor for logging
  responseInterceptorName: 'RESPONSE_INTERCEPTOR', // Name of the response interceptor for logging
  errorInterceptorName: 'ERROR_INTERCEPTOR', // Name of the error interceptor for logging
};

// Define endpoints for different logging levels
export const LoggerEndpoints = {
  debug: '/debug', // Endpoint for debug logs
  error: '/error', // Endpoint for error logs
  info: '/info', // Endpoint for informational logs
  warn: 'warn', // Endpoint for warning logs
  verbose: '/verbose', // Endpoint for verbose logs
  log: '/log', // Endpoint for general logs
};

// Define internal messages for different types of HTTP requests
export const InternalMessages = {
  GET_REQUEST: 'Error in GET request:', // Message for errors in GET requests
  POST_REQUEST: 'Error in POST request:', // Message for errors in POST requests
  PUT_REQUEST: 'Error in PUT request:', // Message for errors in PUT requests
  DELETE_REQUEST: 'Error in DELETE request:', // Message for errors in DELETE requests
};
