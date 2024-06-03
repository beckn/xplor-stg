import { Module } from '@nestjs/common';
import { JobService } from './services/v1/job.serviceV1';
import { JobController } from './controller/v1/job.controllerV1';
import { CommonModule } from '../../common/common.module';
import { AxiosService } from '../../common/axios/axios.service';

@Module({
  imports: [CommonModule],
  controllers: [JobController],
  providers: [JobService, AxiosService],
})
export class JobModule {}
