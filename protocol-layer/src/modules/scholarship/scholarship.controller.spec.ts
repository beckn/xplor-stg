import { Test, TestingModule } from '@nestjs/testing';
import { ScholarshipController } from './scholarship.controllerV1';
import { ScholarshipService } from './services/scholarship.serviceV1';

describe('ScholarshipController', () => {
  let controller: ScholarshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScholarshipController],
      providers: [ScholarshipService],
    }).compile();

    controller = module.get<ScholarshipController>(ScholarshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
