// Import necessary decorators from NestJS
import { Injectable } from '@nestjs/common';

// Decorator to mark this class as a provider that can be injected into other classes
@Injectable()
export class AppService {
  // Method to return a greeting string
  getHello(): string {
    // Returns the string "Hello World!"
    return 'Hello World!';
  }
}
