import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { OndcContext, OnestContext } from '../../util/context.builder';
import { SelectRequestDto } from './dto/select-request.dto';
import { InitRequestDto } from './dto/init-request.dto';
import { ConfirmRequestDto } from './dto/confirm-request.dto';
import { StatusRequestDto } from './dto/status-request.dto';

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

  @Post('on_select')
  onSelect(@Body() selectResponse: OndcContext | OnestContext | any) {
    this.logger.log('on_select===========', JSON.stringify(selectResponse));
    return this.appService.onSelect(selectResponse);
  }
  @Post('init')
  init(@Body() initRequest: InitRequestDto) {
    this.logger.log('initRequest===========', JSON.stringify(initRequest));
    return this.appService.init(initRequest);
  }

  @Post('on_init')
  onInit(@Body() onInitRequest: OndcContext | OnestContext | any) {
    return this.appService.onInit(onInitRequest);
  }

  @Post('confirm')
  confirm(@Body() confirmRequest: ConfirmRequestDto) {
    return this.appService.confirm(confirmRequest);
  }

  @Post('status')
  status(@Body() statusRequest: StatusRequestDto) {
    return this.appService.status(statusRequest);
  }

  @Post('on_status')
  onStatus(@Body() onStatusRequest: OndcContext | OnestContext | any) {
    return this.appService.onStatus(onStatusRequest);
  }

  @Post('on_confirm')
  onConfirm(@Body() confirmRequest: OndcContext | OnestContext | any) {
    return this.appService.onConfirm(confirmRequest);
  }

  // @Get('subscribe')
  // subscribe() {
  //   return this.appService.subscribe();
  // }

  @Get('search')
  getSearchData() {
    return this.appService.getSearchData();
  }
}
