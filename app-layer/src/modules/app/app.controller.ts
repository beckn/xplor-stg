import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { OndcContext, OnestContext } from '../../util/context.builder';
import { SearchQueryDto } from './dto/search-query.dto';

/**
 * Controller for handling various requests in the application.
 * This controller is responsible for processing GET and POST requests, including a search operation and a custom search operation.
 */
@Controller({ version: '1' })
export class AppController {
  private readonly logger = new Logger(AppController.name);
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
    this.logger.log('searchRequest: ', searchRequest);
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

  @Get('search')
  getSearchData(@Query() searchQueryDto: SearchQueryDto) {
    this.logger.log('searchQueryDto: ', searchQueryDto);
    return this.appService.getSearchData(searchQueryDto);
  }
}
