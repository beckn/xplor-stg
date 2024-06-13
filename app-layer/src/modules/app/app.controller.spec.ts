import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Test suite for the AppController.
 * This suite contains tests to verify the functionality of the AppController.
 */
describe('AppController', () => {
  let appController: AppController;

  /**
   * Sets up the testing module before each test.
   * This includes registering the AppController and AppService with the testing module.
   */
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  /**
   * Test suite for the root route of the AppController.
   * This suite contains a single test to verify that the root route returns "Hello World!".
   */
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
