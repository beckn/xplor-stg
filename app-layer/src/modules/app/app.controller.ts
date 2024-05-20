import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { OndcContext, OnestContext } from '../../util/context.builder';
import { SelectRequestDto } from './dto/select-request.dto';
import { InitRequestDto } from './dto/init-request.dto';

/**
 * Controller for handling various requests in the application.
 * This controller is responsible for processing GET and POST requests, including a search operation and a custom search operation.
 */
@Controller({ version: '1' })
export class AppController {
  /**
   * Constructor for the AppController, injecting the AppService for handling business logic.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Handles GET requests to the root path.
   * This method returns a greeting message by calling the getHello method from the AppService.
   * @returns A greeting message.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Handles POST requests to the 'search' path.
   * This method processes search requests by calling the search method from the AppService with the provided search request data.
   * @param searchRequest The search request data.
   * @returns The result of the search operation.
   */
  @Post('search')
  search(@Body() searchRequest: SearchRequestDto) {
    return this.appService.search(searchRequest);
  }

  /**
   * Handles POST requests to the 'on_search' path.
   * This method processes custom search requests by calling the onSearch method from the AppService with the provided search response data.
   * @param searchResponse The search response data, which can be of type OndcContext, OnestContext, or any other type.
   * @returns The result of the custom search operation.
   */
  @Post('on_search')
  onSearch(@Body() searchResponse: OndcContext | OnestContext | any) {
    return this.appService.onSearch(searchResponse);
  }

  @Post('select')
  select(@Body() selectRequest: SelectRequestDto) {
    return this.appService.select(selectRequest);
  }

  @Post('init')
  init(@Body() initRequest: InitRequestDto) {
    return this.appService.init(initRequest);
  }

  @Post('on_init')
  on_init(@Body() onInitRequest: OndcContext | OnestContext | any) {
    return this.appService.onInit(onInitRequest);
  }
}
