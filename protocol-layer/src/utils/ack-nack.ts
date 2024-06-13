// Import necessary decorators
import { Injectable } from '@nestjs/common';

// Define an interface for a tag, which can be used to provide additional information about the response
interface Tag {
  code: string; // Code of the tag
  name: string; // Name of the tag
  value: string; // Value associated with the tag
  display: boolean; // Indicates whether the tag should be displayed
}

// Define an interface for an acknowledgment message, which can be either 'ACK' or 'NACK'
interface AckMessage {
  status: 'ACK' | 'NACK'; // Status of the acknowledgment
  tags?: Tag[]; // Optional array of tags providing additional information
}

// Define an interface for an error message, which can be included in the response if there's an error
interface ErrorMessage {
  type: string; // Type of the error
  code?: string; // Optional error code
  path?: string; // Optional path where the error occurred
  message?: string; // Optional error message
}

// Decorator to mark this class as a provider that can be injected into other classes
@Injectable()
export class AckNackResponse {
  // Property to hold the acknowledgment message
  message: {
    ack: AckMessage;
  };
  // Optional property to hold an error message
  error?: ErrorMessage;

  // Constructor to initialize the acknowledgment and error messages
  constructor(
    messageStatus: 'ACK' | 'NACK', // Status of the acknowledgment
    errorType?: string, // Optional type of the error
    code?: string, // Optional error code
    errorMessage?: string, // Optional error message
    tags?: Tag[], // Optional array of tags
    path?: string, // Optional path where the error occurred
  ) {
    // Initialize the acknowledgment message with the provided status and tags
    this.message = {
      ack: {
        status: messageStatus,
        tags: tags,
      },
    };
    // Initialize the error message with the provided type, code, path, and message
    this.error = {
      type: errorType,
      code: code,
      path: path,
      message: errorMessage,
    };
  }
}
