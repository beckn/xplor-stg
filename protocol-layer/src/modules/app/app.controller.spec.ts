// Import necessary modules and services for testing
import { Test, TestingModule } from '@nestjs/testing';

// Import the AppController and AppService to be tested
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Describe the test suite for the AppController
describe('AppController', () => {
  // Declare a variable to hold the instance of AppController
  let appController: AppController;

  // Setup the testing module before each test
  beforeEach(async () => {
    // Create a testing module with the AppController and AppService
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Include the AppController in the testing module
      providers: [AppService], // Include the AppService as a provider
    }).compile();

    // Get an instance of AppController from the testing module
    appController = app.get<AppController>(AppController);
  });

  // Describe a test case for the 'root' method of AppController
  describe('root', () => {
    // Define a test that checks if the 'getHello' method returns "Hello World!"
    it('should return "Hello World!"', () => {
      // Use the expect function to assert that the output of getHello is "Hello World!"
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
