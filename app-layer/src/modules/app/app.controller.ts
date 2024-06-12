import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { OndcContext, OnestContext } from '../../util/context.builder';
import { SelectRequestDto } from './dto/select-request.dto';
import { InitRequestDto } from './dto/init-request.dto';
import { ConfirmRequestDto } from './dto/confirm-request.dto';
import { StatusRequestDto } from './dto/status-request.dto';
import { TrackingRequestDto } from './dto/tracking-request.dto';
import { RatingRequestDto } from './dto/rating-request.dto';
import { CancelRequestDto } from './dto/cancel-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { SupportRequestDto } from './dto/support-request.dto';
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

  @Post('track')
  track(@Body() statusRequest: TrackingRequestDto) {
    return this.appService.tracking(statusRequest);
  }

  @Post('on_track')
  onTrack(@Body() onStatusRequest: OndcContext | OnestContext | any) {
    return this.appService.onTracking(onStatusRequest);
  }

  @Post('rating')
  rating(@Body() statusRequest: RatingRequestDto) {
    return this.appService.rating(statusRequest);
  }

  @Post('on_rating')
  onRating(@Body() onStatusRequest: OndcContext | OnestContext | any) {
    return this.appService.onRating(onStatusRequest);
  }

  @Post('cancel')
  cancel(@Body() cancelRequest: CancelRequestDto) {
    return this.appService.cancel(cancelRequest);
  }

  @Post('on_cancel')
  onCancel(@Body() onCancelRequest: OndcContext | OnestContext | any) {
    return this.appService.onCancel(onCancelRequest);
  }

  @Post('update')
  update(@Body() updateRequest: UpdateRequestDto) {
    return this.appService.update(updateRequest);
  }

  @Post('on_update')
  onUpdate(@Body() onUpdateRequest: OndcContext | OnestContext | any) {
    return this.appService.onUpdate(onUpdateRequest);
  }

  @Post('support')
  support(@Body() supportRequest: SupportRequestDto) {
    return this.appService.support(supportRequest);
  }

  @Post('on_support')
  onSupport(@Body() onSupportRequest: OndcContext | OnestContext | any) {
    return this.appService.support(onSupportRequest);
  }

  // @Get('subscribe')
  // subscribe() {
  //   return this.appService.subscribe();
  // }

  @Get('search')
  getSearchData(@Query() searchQueryDto: SearchQueryDto) {
    return this.appService.getSearchData(searchQueryDto);
  }
}
