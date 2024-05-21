import { Controller, Post, Body } from '@nestjs/common';
import { ScholarshipService } from './services/scholarship.serviceV1';
import { SearchScholarshipDto } from './dto/search-scholarship.dto';
import {
  InitScholarshipDto,
  SelectScholarshipDto,
} from './dto/request-scholarship.dtp';

@Controller({ version: '1', path: 'scholarship' })
export class ScholarshipController {
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
    console.log('selectScholarshipDto', selectScholarshipDto);
    return this.scholarshipService.select(selectScholarshipDto);
  }

  @Post('init')
  init(@Body() initScholarshipDto: InitScholarshipDto) {
    console.log(JSON.stringify(initScholarshipDto));
    return this.scholarshipService.init(initScholarshipDto);
  }
  @Post('on_init')
  onInit(@Body() onInitScholarshipDto: InitScholarshipDto) {
    console.log(onInitScholarshipDto);
    return this.scholarshipService.onInit(onInitScholarshipDto);
  }
}
