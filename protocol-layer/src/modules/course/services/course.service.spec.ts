import { Test, TestingModule } from '@nestjs/testing';

import { CourseService } from './course.serviceV1';

/**
 * This suite tests the CourseService to ensure it is properly defined and functional.
 * It includes a test to check if the service is defined.
 */
describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
