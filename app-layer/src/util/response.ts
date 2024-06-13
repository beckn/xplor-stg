// Utility function to create a standardized response object
export const getResponse = (
  success: boolean, // Indicates whether the operation was successful
  message: string, // A message describing the result of the operation
  data?: any, // Optional data to include in the response
  error?: any, // Optional error information, if the operation was not successful
) => {
  // Returns an object with a standardized structure for responses
  return {
    success: success, // Indicates the success status of the operation
    message: message, // Provides a message describing the result
    data: data, // Includes any data relevant to the response
    error: error, // Includes error information if the operation failed
  };
};
