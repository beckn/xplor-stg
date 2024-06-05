import { Controller, Post, Body, Logger } from '@nestjs/common';
import { CourseService } from './services/course.serviceV1';
import {
  ConfirmCourseDto,
  InitCourseDto,
  OnConfirmCourseDto,
  OnInitCourseDto,
  OnSelectCourseDto,
  OnStatusCourseDto,
  SearchCourseDto,
  SelectCourseDto,
  StatusCourseDto,
} from './dto/request-course.dto';

@Controller({ version: '1', path: 'course' })
export class CourseController {
  private readonly logger = new Logger(CourseController.name);

  constructor(private readonly courseService: CourseService) {}

  @Post('search')
  search(@Body() searchCourseDto: SearchCourseDto) {
    return this.courseService.search(searchCourseDto);
  }

  @Post('on_search')
  onSearch(@Body() searchCourseDto: SearchCourseDto) {
    return this.courseService.onSearch(searchCourseDto);
  }

  @Post('/select')
  select(@Body() selectCourseDto: SelectCourseDto) {
    this.logger.log(JSON.stringify(selectCourseDto));
    return this.courseService.select(selectCourseDto);
  }
  @Post('/on_select')
  onSelect(@Body() onselectCourseDto: OnSelectCourseDto) {
    this.logger.log(onselectCourseDto);
    return this.courseService.onSelect(onselectCourseDto);
  }

  @Post('/init')
  init(@Body() initCourseDto: InitCourseDto) {
    this.logger.log('initCourseDto', JSON.stringify(initCourseDto));
    return this.courseService.init(initCourseDto);
  }

  @Post('/on_init')
  onInit(@Body() onInitCourseDto: OnInitCourseDto) {
    this.logger.log(onInitCourseDto);
    return this.courseService.onInit(onInitCourseDto);
  }

  @Post('/confirm')
  confirm(@Body() confirmCourseDto: ConfirmCourseDto) {
    this.logger.log('confirmCourseDto', JSON.stringify(confirmCourseDto));
    return this.courseService.confirm(confirmCourseDto);
  }
  @Post('/on_confirm')
  onConfirm(@Body() onConfirmCourseDto: OnConfirmCourseDto) {
    this.logger.log('confirmCourseDto', JSON.stringify(onConfirmCourseDto));
    return this.courseService.onConfirm(onConfirmCourseDto);
  }

  @Post('/status')
  status(@Body() statusCourseDto: StatusCourseDto) {
    this.logger.log('initCourseDto', JSON.stringify(statusCourseDto));
    return this.courseService.status(statusCourseDto);
  }

  @Post('/on_status')
  onStatus(@Body() onStatusCourseDto: OnStatusCourseDto) {
    this.logger.log(onStatusCourseDto);
    return this.courseService.onStatus(onStatusCourseDto);
  }
}
