import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ScholarshipService } from './services/scholarship.serviceV1';
import {
  ConfirmScholarshipDto,
  InitScholarshipDto,
  OnStatusScholarshipDto,
  OnConfirmScholarshipDto,
  SelectScholarshipDto,
  StatusScholarshipDto,
} from './dto/request-scholarship.dtp';
import { SearchScholarshipDto } from './dto/search-scholarship.dto';

@Controller({ version: '1', path: 'scholarship' })
export class ScholarshipController {
  private readonly logger = new Logger(ScholarshipController.name);
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Post('search')
  search(@Body() searchScholarshipDto: SearchScholarshipDto) {
    return this.scholarshipService.search(searchScholarshipDto);
  }
  @Post('on_search')
  on_search(@Body() searchScholarshipDto: SearchScholarshipDto) {
    return this.scholarshipService.on_search(searchScholarshipDto);
  }

  @Post('select')
  select(@Body() selectScholarshipDto: SelectScholarshipDto) {
    this.logger.log('selectScholarshipDto', selectScholarshipDto);
    return this.scholarshipService.select(selectScholarshipDto);
  }

  @Post('on_select')
  on_select(@Body() searchScholarshipDto: SearchScholarshipDto) {
    return this.scholarshipService.on_select(searchScholarshipDto);
  }

  @Post('init')
  init(@Body() initScholarshipDto: InitScholarshipDto) {
    this.logger.log('initScholarship', JSON.stringify(initScholarshipDto));
    return this.scholarshipService.init(initScholarshipDto);
  }
  @Post('on_init')
  onInit(@Body() onInitScholarshipDto: InitScholarshipDto) {
    this.logger.log('on_initScholarship', JSON.stringify(onInitScholarshipDto));
    return this.scholarshipService.onInit(onInitScholarshipDto);
  }

  @Post('status')
  status(@Body() statusScholarshipDto: StatusScholarshipDto) {
    this.logger.log(
      'statusScholarshipDto',
      JSON.stringify(statusScholarshipDto),
    );
    return this.scholarshipService.status(statusScholarshipDto);
  }

  @Post('on_status')
  onStatus(@Body() onStatusScholarshipDto: OnStatusScholarshipDto) {
    this.logger.log(onStatusScholarshipDto);
    return this.scholarshipService.onStatus(onStatusScholarshipDto);
  }

  @Post('confirm')
  confirm(@Body() initCourseDto: ConfirmScholarshipDto) {
    this.logger.log(JSON.stringify(initCourseDto));
    return this.scholarshipService.confirm(initCourseDto);
  }
  @Post('on_confirm')
  onconfirm(@Body() onConfirmScholarshipDto: OnConfirmScholarshipDto) {
    this.logger.log(onConfirmScholarshipDto);
    return this.scholarshipService.onConfirm(onConfirmScholarshipDto);
  }
}
