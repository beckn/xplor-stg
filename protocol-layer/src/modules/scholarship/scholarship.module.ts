import { Module } from '@nestjs/common';
import { ScholarshipService } from './services/scholarship.serviceV1';
import { ScholarshipController } from './scholarship.controllerV1';
import { AxiosService } from '../../common/axios/axios.service';

@Module({
  controllers: [ScholarshipController],
  providers: [ScholarshipService, AxiosService],
})
export class ScholarshipModule {}
