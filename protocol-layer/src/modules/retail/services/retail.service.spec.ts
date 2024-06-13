import { Test, TestingModule } from '@nestjs/testing';
import { RetailService } from './retail.serviceV1';

describe('RetailService', () => {
  let service: RetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetailService],
    }).compile();

    service = module.get<RetailService>(RetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
