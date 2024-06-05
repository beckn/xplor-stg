import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SearchRetailDto } from '../dto/search-retail.dto';
import { searchSchema } from '../schema/search.schema';
import { onSearchSchema } from '../schema/onSearch.schema';
import { AxiosService } from '../../../common/axios/axios.service';
import { ConfigService } from '@nestjs/config';
import { AckNackResponse } from '../../../utils/ack-nack';
import { createOndcNetworkHeader } from '../../../utils/ondc.authentication';
import validateJson from '../../../utils/validator';
import { Action } from '../../../common/constants/action';

@Injectable()
export class RetailService {
  private readonly logger = new Logger(RetailService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}
  async search(searchRetailDto: SearchRetailDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchRetailDto.context,
        message: searchRetailDto.message,
      });
      this.logger.log(isValid, 'searchRetailDto', searchRetailDto);
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      }
      await this.sendSearchRequest(searchRetailDto);
      return new AckNackResponse('ACK');
    } catch (error) {
      throw error;
    }
  }

  async onSearch(searchRetailDto: SearchRetailDto) {
    try {
      const isValid = validateJson(onSearchSchema, {
        context: searchRetailDto.context,
        message: searchRetailDto.message,
      });
      this.logger.log(
        'validatedRetailResponse',
        JSON.stringify(searchRetailDto),
      );
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse('ACK');
        this.logger.log('on_search Response', searchRetailDto);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_search}`,
          searchRetailDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendSearchRequest(searchRetailDto: SearchRetailDto) {
    const searchPayload = {
      context: searchRetailDto.context,
      message: searchRetailDto.message,
    };

    // Preparing a signed key to send to network for authorization
    const signedKey = await createOndcNetworkHeader(
      searchPayload,
      this.configService.get('ONDC_PRIVATE_KEY'),
      this.configService.get('ONDC_SUBSCRIBER_ID'),
      this.configService.get('ONDC_SUBSCRIBER_UNIQUE_KEY_ID'),
    );
    const headers = {
      Authorization: signedKey,
    };

    const result = await this.axiosService.post(
      searchRetailDto.gatewayUrl + '/search',
      searchPayload,
      headers,
    );
    return result;
  }
}
