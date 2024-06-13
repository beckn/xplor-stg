import { Module } from '@nestjs/common';
import { CourseService } from './services/course.serviceV1';
import { CourseController } from './course.controllerV1';
import { AxiosService } from '../../common/axios/axios.service';
import { CommonModule } from '../../common/common.module';
import { HeaderInterceptorService } from '../../common/network/header.interceptor';

@Module({
  imports: [CommonModule],
  controllers: [CourseController],
  providers: [CourseService, AxiosService, HeaderInterceptorService],
  exports: [CourseService],
})
export class CourseModule {}
