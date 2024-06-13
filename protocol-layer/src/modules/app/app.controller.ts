// Import necessary decorators and modules from NestJS
import { Controller, Get } from '@nestjs/common';

// Import the AppService to be used within the controller
import { AppService } from './app.service';

// Decorator to define the class as a controller
@Controller()
export class AppController {
  // Constructor to inject dependencies
  constructor(private readonly appService: AppService) {}

  // Decorator to define a GET endpoint
  @Get()
  // Method to handle GET requests to the root path
  getHello(): string {
    // Call the getHello method from the AppService and return its result
    return this.appService.getHello();
  }
}
