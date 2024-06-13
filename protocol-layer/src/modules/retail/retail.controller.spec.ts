import { Test, TestingModule } from '@nestjs/testing';
import { RetailController } from './retail.controllerV1';
import { RetailService } from './services/retail.serviceV1';

describe('RetailController', () => {
  let controller: RetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetailController],
      providers: [RetailService],
    }).compile();

    controller = module.get<RetailController>(RetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
