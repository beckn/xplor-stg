// Import necessary modules and services
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchRequestDto } from './dto/search-request.dto';
import { AxiosService } from '../../common/axios/axios.service';
import { getResponse } from '../../util/response';
import { DumpService } from '../dump/service/dump.service';

import { SearchQueryDto } from './dto/search-query.dto';

// Decorator to mark this class as a provider that can be injected into other classes
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // Constructor to inject dependencies
  constructor(
    private readonly httpService: AxiosService, // Service for making HTTP requests
    private readonly configService: ConfigService, // Service for accessing configuration values
    private readonly dumpService: DumpService, // Service for dumping the request & response // private readonly kafkaService: KafkaService,
  ) {
    // Initialize the configService with a new instance
    this.configService = new ConfigService();
  }

  // Simple method to return a greeting string
  getHello(): string {
    return 'Hello World!';
  }

  // Method to perform a search operation
  async search(searchRequest: SearchRequestDto) {
    try {
      const searchResponse = await this.httpService.post(
        this.configService.get('GCL_BASE_URL') + '/search',
        searchRequest,
      );
      searchResponse;
      this.logger.log('searchResponse: ', searchResponse);
      // Return a success response
      return getResponse(true, searchResponse, null, null);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.log(
        'error?.response?.data?.error?.message',
        error?.response?.data?.error?.message,
      );
      if (
        error?.response?.data?.error?.message == '' ||
        error?.response?.data?.error?.message == undefined
      ) {
        return true;
      }
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to handle search requests and delegate to the sendSearch method
  async onSearch(response: any) {
    try {
      this.logger.log('onSearchResponse: ', response);
      // Dump the response into database
      const providerId = response?.data[0]?.message?.providers[0]?.id;
      const updateData = {
        data: response?.data,
      };

      this.logger.log('updateData: ', updateData);
      this.logger.log('providerId', providerId);
      const dBResponse = await this.dumpService.upsertDump(
        providerId,
        updateData,
      );
      this.logger.log('DB data: ', dBResponse);
      // await this.sendSearch(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to send a search request to a specific service
  async sendSearch(searchPayload: SearchRequestDto | any) {
    try {
      // Initialize variables for job, course, and scholarship payloads

      this.logger.debug('sendSearch Payload', searchPayload);
      // const payloadSendToKafka = {
      //   context: {
      //     transaction_id: response?.context?.transaction_id,
      //     domain: response?.context?.domain,
      //   },
      //   message: {
      //     catalog: response?.message?.catalog,
      //   },
      // };
      // await this.kafkaService.produceMessage(payloadSendToKafka);

      // Construct the URL for the search request
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_search';
      // Send the search request and log the response
      const resp = await this.httpService.post(url, searchPayload);
      this.logger.log(
        'Send on_search payload to CORE service:',
        JSON.stringify(resp),
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error);
      return new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  //comment down it for future use.

  // async subscribe() {
  //   try {
  //     const payload = await this.dumpService.findAll();
  //     // this.logger.log(payload);
  //     const subscribedResponse = await Promise.all(
  //       payload.map(async (data) => {
  //         const messagePayload = {
  //           context: {
  //             transaction_id: data?.transaction_id,
  //             domain: data?.domain,
  //           },
  //           message: data?.message,
  //         };
  //         return await this.kafkaService.produceMessage(messagePayload);
  //       }),

  //     );
  //     this.logger.log(subscribedResponse)
  //     return subscribedResponse;
  //   } catch (error) {
  //     this.logger.error(error)
  //   }

  // }

  async getSearchData(searchQueryDto: SearchQueryDto) {
    try {
      // const totalCount = await this.dumpService.findCount();
      const payload = await this.dumpService.findWithPagination(searchQueryDto);
      // this.logger.log(payload);
      const transformedPayload = await Promise.all(
        payload.map(async (data) => {
          return await { data: data?.data };
        }),
      );
      this.logger.log('transformedPayload', transformedPayload);
      return transformedPayload;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
