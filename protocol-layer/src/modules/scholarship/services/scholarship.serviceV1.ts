/* eslint-disable no-console */
import { BadRequestException, Injectable } from '@nestjs/common';

import { searchSchema } from '../schema/search.schema';
import { SearchScholarshipDto } from '../dto/search-scholarship.dto';
import { AxiosService } from '../../../common/axios/axios.service';
import { GrafanaLoggerService } from 'src/services/grafana/service/grafana.service';
import validateJson from 'src/utils/validator';
import { AckNackResponse } from 'src/utils/ack-nack';
import {
  ACK,
  Action,
  CONTEXT_ERROR,
  ERROR_CODE_CONTEXT,
  NACK,
} from 'src/common/constants/action';
import { ConfigService } from '@nestjs/config';
import { onSearchSchema } from '../schema/onSearch.schema';
import { selectSchema } from '../schema/select.schema';
import {
  ConfirmScholarshipDto,
  InitScholarshipDto,
  OnConfirmScholarshipDto,
  OnInitScholarshipDto,
  OnStatusScholarshipDto,
  SelectScholarshipDto,
  StatusScholarshipDto,
} from '../dto/request-scholarship.dtp';
import { onInitSchema } from '../schema/onInit.schema';
import { initSchema } from '../schema/init.schema';
import { onSelectSchema } from '../schema/on-select.schema';
import { confirmSchema } from '../schema/confirm.schema';
import { onConfirmSchema } from '../schema/onConfirm.schema';
import { onStatusSchema } from '../schema/onStatus.schema';
import { statusSchema } from '../schema/status.schema';
import {
  scholarshipConfirmResponse,
  scholarshipInitResponse,
  scholarshipSelectResponse,
  scholarshipStatusResponse,
} from 'src/utils/mock-response';

@Injectable()
export class ScholarshipService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly loggerService: GrafanaLoggerService,
    private readonly configService: ConfigService,
  ) {}
  async search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      console.log(
        JSON.stringify(searchScholarshipDto.message),
        'search_scholarship_dto',
      );
      console.log(
        JSON.stringify(searchScholarshipDto.message),
        'search_scholarship_dto',
      );
      const isValid = validateJson(searchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      console.log(isValid);
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      }
      this.sendSearchRequest(searchScholarshipDto);
      return new AckNackResponse('ACK');
    } catch (error) {
      throw error;
    }
  }

  private async sendSearchRequest(searchScholarshipDto: SearchScholarshipDto) {
    const searchPayload = {
      context: searchScholarshipDto.context,
      message: searchScholarshipDto.message,
    };
    console.log(searchScholarshipDto.gatewayUrl, 'gatewayUrl');
    const result = await this.axiosService.post(
      searchScholarshipDto.gatewayUrl + '/search',
      searchPayload,
    );
    console.log(searchPayload, JSON.stringify(searchPayload), 'searchPayload');
    console.log(result?.message, 'scholarshipGatewayResult',searchScholarshipDto.gatewayUrl + '/search');
    console.log(result, 'scholarshipGatewayResult');
    return result;
  }

  async on_search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(onSearchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
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
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_search}`,
          searchScholarshipDto,
        );
        return message;
      }
    } catch (error) {
      this.loggerService.sendDebug({
        message: error,
        methodName: this.on_search.name,
      });
      throw error;
    }
  }

  async select(selectScholarshipDto: SelectScholarshipDto) {
    try {
      const isValid = validateJson(selectSchema, {
        context: selectScholarshipDto.context,
        message: selectScholarshipDto.message,
      });
      console.log('isValid', isValid);
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
        await this.sendSelectRequest(selectScholarshipDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async sendSelectRequest(selectScholarshipDto: SelectScholarshipDto) {
    try {
      const selectPayload = {
        context: selectScholarshipDto.context,
        message: selectScholarshipDto.message,
      };
      const env = this.configService.get('NODE_ENV');
      const url =
        env === 'development'
          ? selectScholarshipDto.gatewayUrl + `/${Action.select}`
          : selectPayload.context.bpp_uri + `${Action.select}`;
      const selectResponse = await this.axiosService.post(url, selectPayload);
      console.log('selectRequest=======', selectResponse);
      const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
      console.log('IS_NETWORK_MOCK', isNetworkMock);
      if (isNetworkMock) {
        this.mockSelectResponse(
          selectPayload.context.transaction_id,
          selectPayload.context.bap_uri,
        );
      }
      return selectResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async init(initScholarshipDto: InitScholarshipDto) {
    try {
      const isValid = validateJson(initSchema, {
        context: initScholarshipDto.context,
        message: initScholarshipDto.message,
      });
      console.log('isValid', isValid);
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
        await this.sendInitRequest(initScholarshipDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async onInit(onInitScholarshipDto: OnInitScholarshipDto) {
    try {
      console.log('onInitScholarshipDto', onInitScholarshipDto);
      const isValid = validateJson(onInitSchema, {
        context: onInitScholarshipDto.context,
        message: onInitScholarshipDto.message,
      });
      console.log(isValid);
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
          onInitScholarshipDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }
  private async sendInitRequest(initScholarshipDto: InitScholarshipDto) {
    try {
      const initPayload = {
        context: initScholarshipDto.context,
        message: initScholarshipDto.message,
      };

      const env = this.configService.get('NODE_ENV');
      const url =
        env === 'development'
          ? initScholarshipDto.gatewayUrl + `/${Action.init}`
          : initPayload.context.bpp_uri + `${Action.init}`;
      console.log(url);
      const initResponse = await this.axiosService.post(url, initPayload);
      console.log('initRequest=======', initResponse);
      const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
      console.log('IS_NETWORK_MOCK', isNetworkMock);
      if (isNetworkMock) {
        this.mockInitResponse(
          initPayload.context.transaction_id,
          initPayload.context.bap_uri,
        );
      }
      return initResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async on_select(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(onSelectSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
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
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_select}`,
          searchScholarshipDto,
        );
        return message;
      }
    } catch (error) {
      this.loggerService.sendDebug({
        message: error,
        methodName: this.on_search.name,
      });
      throw error;
    }
  }

  async confirm(confirmScholarshipDto: ConfirmScholarshipDto) {
    try {
      const isValid = validateJson(confirmSchema, {
        context: confirmScholarshipDto.context,
        message: confirmScholarshipDto.message,
      });
      console.log('isValid', isValid);
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
        console.log('confirmScholarshipDto', confirmScholarshipDto);
        await this.sendConfirmRequest(confirmScholarshipDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async onConfirm(onConfirmScholarshipDto: OnConfirmScholarshipDto) {
    try {
      console.log(
        'onConfirmScholarshipDto',
        JSON.stringify(onConfirmScholarshipDto),
      );
      const isValid = validateJson(onConfirmSchema, {
        context: onConfirmScholarshipDto.context,
        message: onConfirmScholarshipDto.message,
      });
      console.log(isValid);
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
          onConfirmScholarshipDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendConfirmRequest(
    confirmScholarshipDto: ConfirmScholarshipDto,
  ) {
    try {
      const confirmPayload = {
        context: confirmScholarshipDto.context,
        message: confirmScholarshipDto.message,
      };
      console.log('confirmPayload', JSON.stringify(confirmPayload));
      const env = this.configService.get('NODE_ENV');
      const url =
        env === 'development'
          ? confirmScholarshipDto.gatewayUrl + `/${Action.confirm}`
          : confirmPayload.context.bpp_id + `${Action.confirm}`;
      const selectResponse = await this.axiosService.post(url, confirmPayload);
      console.log('confirmRequest=======', selectResponse);
      const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
      console.log('IS_NETWORK_MOCK', isNetworkMock);
      if (isNetworkMock) {
        this.mockConfirmResponse(
          confirmPayload.context.transaction_id,
          confirmPayload.context.bap_uri,
        );
      }
      return selectResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async status(statusScholarshipDto: StatusScholarshipDto) {
    try {
      const isValid = validateJson(statusSchema, {
        context: statusScholarshipDto.context,
        message: statusScholarshipDto.message,
      });
      console.log('isValid', isValid);
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
        console.log('statusScholarshipDto', statusScholarshipDto);
        await this.sendStatusRequest(statusScholarshipDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async onStatus(onStatusScholarshipDto: OnStatusScholarshipDto) {
    try {
      console.log('onStatusScholarshipDto', onStatusScholarshipDto);
      const isValid = validateJson(onStatusSchema, {
        context: onStatusScholarshipDto.context,
        message: onStatusScholarshipDto.message,
      });
      console.log(isValid);
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
          onStatusScholarshipDto,
        );
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
  private async sendStatusRequest(statusScholarshipDto: StatusScholarshipDto) {
    try {
      const statusPayload = {
        context: statusScholarshipDto.context,
        message: statusScholarshipDto.message,
      };

      const env = this.configService.get('NODE_ENV');
      const url =
        env === 'development'
          ? statusScholarshipDto.gatewayUrl + `/${Action.status}`
          : statusScholarshipDto.context.bpp_id + `${Action.status}`;
      const statusResponse = await this.axiosService.post(url, statusPayload);
      console.log('statusResponse', statusResponse);
      console.log('statusRequest=======', statusResponse);
      const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
      console.log('IS_NETWORK_MOCK', isNetworkMock);
      if (isNetworkMock) {
        this.mockStatusResponse(
          statusPayload.context.transaction_id,
          statusPayload.context.bap_uri,
        );
      }
      return statusResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }
  async mockInitResponse(transaction_id: string, baseUrl: string) {
    const url = baseUrl + '/' + Action.on_init;
    const mockRequest = await this.axiosService.post(
      url,
      scholarshipInitResponse(transaction_id),
    );
    console.log('mockRequest', mockRequest);
  }

  async mockSelectResponse(transaction_id: string, baseUrl: string) {
    const url = baseUrl + '/' + Action.on_select;
    const mockRequest = await this.axiosService.post(
      url,
      scholarshipSelectResponse(transaction_id),
    );
    console.log('mockRequest', mockRequest);
  }

  async mockConfirmResponse(transaction_id: string, baseUrl) {
    const url = baseUrl + '/' + Action.on_confirm;
    const mockRequest = await this.axiosService.post(
      url,
      scholarshipConfirmResponse(transaction_id),
    );
    console.log('mockRequest', mockRequest);
  }

  async mockStatusResponse(transaction_id: string, baseUrl) {
    const url = baseUrl + '/' + Action.on_status;
    const mockRequest = await this.axiosService.post(
      url,
      scholarshipStatusResponse(transaction_id),
    );
    console.log('mockRequest', mockRequest);
  }
}
