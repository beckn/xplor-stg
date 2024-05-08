import { Module } from '@nestjs/common';
import { CourseService } from './services/course.serviceV1';
import { CourseController } from './course.controllerV1';
import { AxiosService } from 'src/common/axios/axios.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CourseController],
  providers: [CourseService, AxiosService],
  exports: [CourseService],
})
export class CourseModule {}
