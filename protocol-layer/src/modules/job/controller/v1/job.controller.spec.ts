import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controllerV1';
import { JobService } from '../../services/v1/job.serviceV1';

describe('JobController', () => {
  let controller: JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [JobService],
    }).compile();

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
