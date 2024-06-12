import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AxiosService } from '../.../../../../common/axios/axios.service';

import { searchSchema } from '../schema/search.schema';
import {
  CancelCourseDto,
  ConfirmCourseDto,
  InitCourseDto,
  OnCancelCourseDto,
  OnConfirmCourseDto,
  OnInitCourseDto,
  OnRatingCourseDto,
  OnSelectCourseDto,
  OnStatusCourseDto,
  OnTrackingCourseDto,
  RatingCourseDto,
  SearchCourseDto,
  SelectCourseDto,
  StatusCourseDto,
  SupportCourseDto,
  TrackingCourseDto,
  UpdateCourseDto,
} from '../dto/request-course.dto';

import validateJson from '../.../../../../utils/validator';
import { AckNackResponse } from '../.../../../../utils/ack-nack';
import { ConfigService } from '@nestjs/config';
import {
  ACK,
  Action,
  CONTEXT_ERROR,
  ERROR_CODE_CONTEXT,
  NACK,
} from '../.../../../../common/constants/action';
import { selectSchema } from '../schema/select.schema';
import { initSchema } from '../schema/init.schema';
import { onConfirmSchema } from '../schema/onConfirm.schema';
import { statusSchema } from '../schema/status.schema';
import {
  courseConfirmResponse,
  courseInitResponse,
  courseSelectResponse,
  courseStatusResponse,
} from '../../../utils/mock-response';
import { HeaderInterceptorService } from '../../../common/network/header.interceptor';
import { DomainsEnum } from 'src/common/constants/enums';
import { onTrackingSchema } from '../schema/onTracking.schema';
import { trackingSchema } from '../schema/tracking.schema';
import { ratingSchema } from '../schema/rating.schema';
import { onRatingSchema } from '../schema/onRating.schema';
import { cancelSchema } from '../schema/cancel.schema';
import { onCancelSchema } from '../schema/onCancel.schema';
import { updateSchema } from '../schema/update.schema';
import { supportSchema } from '../schema/support.schema';
// import { onUpdateSchema } from '../schema/onUpdate.schema';
@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly axiosService: AxiosService,
    private readonly axiosHeaderService: HeaderInterceptorService,
    private readonly httpService: HttpService,
  ) {}
  search(searchCourseDto: SearchCourseDto) {
    try {
      this.logger.log('searchCourseDto', searchCourseDto);
      const isValid = validateJson(searchSchema, {
        context: searchCourseDto.context,
        message: searchCourseDto.message,
      });
      this.logger.log('searchCourseDto', searchCourseDto);
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      }
      this.sendSearchRequest(searchCourseDto);
      return new AckNackResponse('ACK');
    } catch (error) {
      throw error;
    }
  }

  async onSearch(searchCourseDto: SearchCourseDto) {
    try {
      this.logger.log('courseOnSearchResponse', searchCourseDto);
      // const isValid = validateJson(onSearchSchema, {
      //   context: searchCourseDto.context,
      //   message: searchCourseDto.message,
      // });
      const isValid = true;
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        const response = await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_search}`,
          searchCourseDto,
        );
        this.logger.log('response', response);
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendSearchRequest(searchCourseDto: SearchCourseDto) {
    const searchPayload = {
      context: searchCourseDto.context,
      message: searchCourseDto.message,
    };
    const result = await this.axiosHeaderService
      .getAxiosInstance()
      .post(searchCourseDto.gatewayUrl + '/search', searchPayload);
    return result;
  }

  async select(selectCourseDto: SelectCourseDto) {
    try {
      const isValid = validateJson(selectSchema, {
        context: selectCourseDto.context,
        message: selectCourseDto.message,
      });
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        await this.sendSelectRequest(selectCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async onSelect(onSelectCourseDto: OnSelectCourseDto) {
    try {
      this.logger.log('courseOnSearchResponse', onSelectCourseDto);
      // const isValid = validateJson(onSelectSchema, {
      //   context: onSelectCourseDto.context,
      //   message: onSelectCourseDto.message,
      // });
      const isValid = true;
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        const response = await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_select}`,
          onSelectCourseDto,
        );
        this.logger.log('response', response);
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendSelectRequest(selectCourseDto: SelectCourseDto) {
    try {
      const selectPayload = {
        context: selectCourseDto.context,
        message: selectCourseDto.message,
      };

      if (selectCourseDto.context.domain === DomainsEnum.BELEM) {
        const url = selectCourseDto.context.bpp_uri + `/${Action.select}`;
        this.logger.log(url);
        const selectResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, selectPayload);
        this.logger.log(selectResponse.statusText, 'selectRequest=======');
        return selectResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockSelectResponse(
            selectPayload.context.transaction_id,
            selectPayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log('error===============', error);
      throw error;
    }
  }

  async init(initCourseDto: InitCourseDto) {
    try {
      const isValid = validateJson(initSchema, {
        context: initCourseDto.context,
        message: initCourseDto.message,
      });
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('initCourseDto', initCourseDto);
        await this.sendInitRequest(initCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async onInit(onInitCourseDto: OnInitCourseDto) {
    try {
      this.logger.log('onInitCourseDto', onInitCourseDto);
      // const isValid = validateJson(onInitSchema, {
      //   context: onInitCourseDto.context,
      //   message: onInitCourseDto.message,
      // });
      const isValid = true;
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_init}`,
          onInitCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }
  private async sendInitRequest(initCourseDto: InitCourseDto) {
    try {
      const initPayload = {
        context: initCourseDto.context,
        message: initCourseDto.message,
      };

      if (initCourseDto.context.domain === DomainsEnum.BELEM) {
        const url = initPayload.context.bpp_uri + `/${Action.init}`;
        const initResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, initPayload);
        return initResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockInitResponse(
            initPayload.context.transaction_id,
            initPayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log('error===============', error);
      throw error;
    }
  }

  async confirm(confirmCourseDto: ConfirmCourseDto) {
    try {
      // const isValid = validateJson(confirmSchema, {
      //   context: confirmCourseDto.context,
      //   message: confirmCourseDto.message,
      // });
      const isValid = true;
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('confirmCourseDto', confirmCourseDto);
        await this.sendConfirmRequest(confirmCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async onConfirm(onConfirmCourseDto: OnConfirmCourseDto) {
    try {
      this.logger.log('onConfirmCourseDto', onConfirmCourseDto);
      const isValid = validateJson(onConfirmSchema, {
        context: onConfirmCourseDto.context,
        message: onConfirmCourseDto.message,
      });
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_confirm}`,
          onConfirmCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendConfirmRequest(confirmCourseDto: ConfirmCourseDto) {
    try {
      const confirmPayload = {
        context: confirmCourseDto.context,
        message: confirmCourseDto.message,
      };
      if (confirmPayload.context.domain === DomainsEnum.BELEM) {
        this.logger.log(confirmPayload, 'ConfirmPayload');
        const url = confirmPayload.context.bpp_uri + `/${Action.confirm}`;
        console.log(url, 'url');
        const selectResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, confirmPayload);
        // this.logger.log('confirmRequest=======', selectResponse);
        return selectResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockConfirmResponse(
            confirmPayload.context.transaction_id,
            confirmPayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log(error, 'error response');
      throw error?.response;
    }
  }

  async status(statusCourseDto: StatusCourseDto) {
    try {
      const isValid = validateJson(statusSchema, {
        context: statusCourseDto.context,
        message: statusCourseDto.message,
      });
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('statusCourseDto', statusCourseDto);
        await this.sendStatusRequest(statusCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async tracking(trackingCourseDto: TrackingCourseDto) {
    try {
      const isValid = validateJson(trackingSchema, {
        context: trackingCourseDto.context,
        message: trackingCourseDto.message,
      });
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('trackingCourseDto', trackingCourseDto);
        await this.sendTrackingRequest(trackingCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendTrackingRequest(trackingCourseDto: TrackingCourseDto) {
    try {
      const trackingPayload = {
        context: trackingCourseDto.context,
        message: trackingCourseDto.message,
      };
      if (trackingPayload.context.domain === DomainsEnum.BELEM) {
        this.logger.log(trackingPayload, 'trackingPayload');
        const url = trackingPayload.context.bpp_uri + `/${Action.tracking}`;
        const selectResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, trackingPayload);
        // this.logger.log('trackingRequest=======', selectResponse);
        return selectResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockConfirmResponse(
            trackingPayload.context.transaction_id,
            trackingPayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log('error response', error);
      throw error;
    }
  }

  async onTracking(onConfirmCourseDto: OnTrackingCourseDto) {
    try {
      this.logger.log('onConfirmCourseDto', onConfirmCourseDto);
      const isValid = validateJson(onTrackingSchema, {
        context: onConfirmCourseDto.context,
        message: onConfirmCourseDto.message,
      });
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_tracking}`,
          onConfirmCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  async rating(ratingCourseDto: RatingCourseDto) {
    try {
      const isValid = validateJson(ratingSchema, {
        context: ratingCourseDto.context,
        message: ratingCourseDto.message,
      });
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('ratingCourseDto', ratingCourseDto);
        await this.sendRatingRequest(ratingCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendRatingRequest(ratingCourseDto: RatingCourseDto) {
    try {
      const ratingPayload = {
        context: ratingCourseDto.context,
        message: ratingCourseDto.message,
      };
      if (ratingPayload.context.domain === DomainsEnum.BELEM) {
        this.logger.log(ratingPayload, 'ratingPayload');
        const url = ratingPayload.context.bpp_uri + `/${Action.rating}`;
        const selectResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, ratingPayload);
        this.logger.log('ratingRequest=======', selectResponse);
        return selectResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockConfirmResponse(
            ratingPayload.context.transaction_id,
            ratingPayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log('error response', error);
      throw error;
    }
  }

  async onRating(onRatingCourseDto: OnRatingCourseDto) {
    try {
      this.logger.log('onRatingCourseDto', onRatingCourseDto);
      const isValid = validateJson(onRatingSchema, {
        context: onRatingCourseDto.context,
        message: onRatingCourseDto.message,
      });
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_rating}`,
          onRatingCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  async cancel(cancelCourseDto: CancelCourseDto) {
    try {
      const isValid = validateJson(cancelSchema, {
        context: cancelCourseDto.context,
        message: cancelCourseDto.message,
      });
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('cancelCourseDto', cancelCourseDto);
        await this.sendCancelRequest(cancelCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendCancelRequest(cancelCourseDto: CancelCourseDto) {
    try {
      const cancelPayload = {
        context: cancelCourseDto.context,
        message: cancelCourseDto.message,
      };
      if (cancelCourseDto.context.domain === DomainsEnum.BELEM) {
        this.logger.log(cancelCourseDto, 'cancelCourseDto');
        const url = cancelPayload.context.bpp_uri + `/${Action.cancel}`;
        const selectResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, cancelCourseDto);
        this.logger.log('cancelRequest=======', selectResponse);
        return selectResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockConfirmResponse(
            cancelPayload.context.transaction_id,
            cancelPayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log('error response', error);
      throw error;
    }
  }

  async onCancel(onCancelCourseDto: OnCancelCourseDto) {
    try {
      this.logger.log('onCancelCourseDto', onCancelCourseDto);
      const isValid = validateJson(onCancelSchema, {
        context: onCancelCourseDto.context,
        message: onCancelCourseDto.message,
      });
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_cancel}`,
          onCancelCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(updateCourseDto: UpdateCourseDto) {
    try {
      this.logger.log('updateCourseDto', updateCourseDto);
      const isValid = validateJson(updateSchema, {
        context: updateCourseDto.context,
        message: updateCourseDto.message,
      });
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('updateCourseDto', updateCourseDto);
        await this.sendUpdateRequest(updateCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendUpdateRequest(updateCourseDto: UpdateCourseDto) {
    try {
      const updatePayload = {
        context: updateCourseDto.context,
        message: updateCourseDto.message,
      };
      if (updateCourseDto.context.domain === DomainsEnum.BELEM) {
        this.logger.log(updateCourseDto, 'updateCourseDto');
        const url = updatePayload.context.bpp_uri + `/${Action.update}`;
        const updateResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, updateCourseDto);
        return updateResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockConfirmResponse(
            updatePayload.context.transaction_id,
            updatePayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log('error response', error);
      throw error;
    }
  }

  async onUpdate(onUpdateCourseDto: UpdateCourseDto) {
    try {
      this.logger.log('onUpdateCourseDto', onUpdateCourseDto);
      // const isValid = validateJson(onUpdateSchema, {
      //   context: onUpdateCourseDto.context,
      //   message: onUpdateCourseDto.message,
      // });
      const isValid = true;
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_update}`,
          onUpdateCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  async support(supportCourseDto: SupportCourseDto) {
    try {
      this.logger.log('supportCourseDto', supportCourseDto);
      const isValid = validateJson(supportSchema, {
        context: supportCourseDto.context,
        message: supportCourseDto.message,
      });
      this.logger.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('supportCourseDto', supportCourseDto);
        await this.sendSupportRequest(supportCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendSupportRequest(supportCourseDto: SupportCourseDto) {
    try {
      const supportPayload = {
        context: supportCourseDto.context,
        message: supportCourseDto.message,
      };
      if (supportCourseDto.context.domain === DomainsEnum.BELEM) {
        this.logger.log(supportCourseDto, 'supportCourseDto');
        const url = supportPayload.context.bpp_uri + `/${Action.support}`;
        const updateResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, supportCourseDto);
        return updateResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockConfirmResponse(
            supportPayload.context.transaction_id,
            supportPayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log('error response', error);
      throw error;
    }
  }

  async onSupport(onSupportCourseDto: UpdateCourseDto) {
    try {
      this.logger.log('onSupportCourseDto', onSupportCourseDto);
      // const isValid = validateJson(onUpdateSchema, {
      //   context: onUpdateCourseDto.context,
      //   message: onUpdateCourseDto.message,
      // });
      const isValid = true;
      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_support}`,
          onSupportCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  async mockInitResponse(transaction_id: string, baseUrl: string) {
    const url = baseUrl + '/' + Action.on_init;
    const mockRequest = await this.axiosService.post(
      url,
      courseInitResponse(transaction_id),
    );
    this.logger.log('mockRequest', mockRequest);
  }

  async mockSelectResponse(transaction_id: string, baseUrl: string) {
    const url = baseUrl + '/' + Action.on_select;
    const mockRequest = await this.axiosService.post(
      url,
      courseSelectResponse(transaction_id),
    );
    this.logger.log('mockRequest', mockRequest);
  }

  async mockConfirmResponse(transaction_id: string, baseUrl) {
    const url = baseUrl + '/' + Action.on_confirm;
    const mockRequest = await this.axiosService.post(
      url,
      courseConfirmResponse(transaction_id),
    );
    this.logger.log('mockRequest', mockRequest);
  }

  async mockStatusResponse(transaction_id: string, baseUrl) {
    const url = baseUrl + '/' + Action.on_status;
    const mockRequest = await this.axiosService.post(
      url,
      courseStatusResponse(transaction_id),
    );
    this.logger.log('mockRequest', mockRequest);
  }

  async onStatus(onStatusCourseDto: OnStatusCourseDto) {
    try {
      this.logger.log('onStatusCourseDto', onStatusCourseDto);
      // const isValid = validateJson(onStatusSchema, {
      //   context: onStatusCourseDto.context,
      //   message: onStatusCourseDto.message,
      // });
      const isValid = true;

      this.logger.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        const response = await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_status}`,
          onStatusCourseDto,
        );
        this.logger.debug(response);
        return message;
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  private async sendStatusRequest(statusCourseDto: StatusCourseDto) {
    try {
      const statusPayload = {
        context: statusCourseDto.context,
        message: statusCourseDto.message,
      };
      if (statusCourseDto.context.domain === DomainsEnum.BELEM) {
        const url = statusCourseDto.context.bpp_uri + `/${Action.status}`;
        const statusResponse = await this.axiosHeaderService
          .getAxiosInstance()
          .post(url, statusPayload);
        // this.logger.log('statusResponse', statusResponse);
        // this.logger.log('statusRequest=======', statusResponse);
        return statusResponse;
      } else {
        const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
        this.logger.log('IS_NETWORK_MOCK', isNetworkMock);
        if (isNetworkMock) {
          this.mockStatusResponse(
            statusPayload.context.transaction_id,
            statusPayload.context.bap_uri,
          );
        }
      }
    } catch (error) {
      this.logger.log('error===============', error);
      throw error?.response;
    }
  }
}
