import { Controller, Post, Body, Logger } from '@nestjs/common';
import { JobService } from '../../services/v1/job.serviceV1';
import { SearchJobDto } from '../../dto/request-job.dto';

@Controller('job')
export class JobController {
  private readonly logger = new Logger(JobController.name);

  constructor(private readonly jobService: JobService) {}

  @Post('/search')
  search(@Body() searchJobDto: SearchJobDto) {
    this.logger.log(searchJobDto);
    return this.jobService.search(searchJobDto);
  }
  @Post('/on_search')
  OnSearch(@Body() searchJobDto: SearchJobDto) {
    this.logger.log(searchJobDto);
    return this.jobService.onSearch(searchJobDto);
  }

  @Post('/select')
  select(@Body() searchJobDto: SearchJobDto) {
    this.logger.log(searchJobDto);
    return this.jobService.search(searchJobDto);
  }
  @Post('/on_search')
  OnSelect(@Body() searchJobDto: SearchJobDto) {
    this.logger.log(searchJobDto);
    return this.jobService.onSearch(searchJobDto);
  }
}
