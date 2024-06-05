// Import necessary modules and services
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchRequestDto } from './dto/search-request.dto';
import { GlobalActionService } from '../../common/action/global-action';
import { JobResponseService } from './response/job/job-response.service';
import { DomainsEnum } from '../../common/constants/enums';
import { AxiosService } from '../../common/axios/axios.service';
import { getResponse } from '../../util/response';
import { coreResponseMessage } from '../../common/constants/http-response-message';
import { RetailResponseService } from './response/retail/retail-response.service';
import { DumpService } from '../dump/service/dump.service';
import { SelectRequestDto } from './dto/select-request.dto';
import { ScholarshipResponseService } from './response/scholarship/scholarship-response.service';
import { CourseResponseService } from './response/course/course-response.service';
import { InitRequestDto } from './dto/init-request.dto';
import { ConfirmRequestDto } from './dto/confirm-request.dto';
import { StatusRequestDto } from './dto/status-request.dto';

// Decorator to mark this class as a provider that can be injected into other classes
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // Constructor to inject dependencies
  constructor(
    private readonly globalActionService: GlobalActionService, // Service for global actions
    private onestCreatePayload: JobResponseService, // Service to create job response payloads
    private onestCreateScholarshipPayload: ScholarshipResponseService, // Service to create job response payloads
    private onestCreateCoursePayload: CourseResponseService, // Service to create course response payloads

    private ondcCreatePayload: RetailResponseService, // Service to create job response payloads
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
      // Dump the request into database
      // const createDumpDto: CreateDumpDto = {
      //   context: searchRequest.context,
      //   domains: [...searchRequest.domain],
      //   transaction_id: searchRequest.context.transaction_id,
      //   message_id: searchRequest.context.message_id,
      //   request_type: Action.search,
      //   message: searchRequest.message,
      // };

      // await this.dumpService.create(createDumpDto);
      // Perform the global search using the injected service
      await this.globalActionService.globalSearch(
        searchRequest.domain,
        searchRequest.context,
        searchRequest.message,
      );
      // Return a success response
      return getResponse(
        true,
        coreResponseMessage.searchSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to handle search requests and delegate to the sendSearch method
  async onSearch(response: any) {
    try {
      this.logger.log(
        'response ==================',
        JSON.stringify(response),
        '=============================',
      );
      // const domain =
      //   response?.context?.domain === DomainsEnum.COURSE_DOMAIN
      //     ? 'course'
      //     : response?.context?.domain === DomainsEnum.JOB_DOMAIN
      //     ? 'job'
      //     : response?.context?.domain === DomainsEnum.SCHOLARSHIP_DOMAIN
      //     ? 'scholarship'
      //     : 'retail';

      // Dump the response into database
      const providerId = response?.message?.catalog?.providers[0]?.id;
      const updateData = {
        context: response?.context,
        transaction_id: response?.context?.transaction_id,
        domain: response?.context?.domain,
        provider_id: response?.message?.catalog?.providers[0]?.id,
        message: response?.message,
      };

      await this.dumpService.upsertDump(providerId, updateData);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to send a search request to a specific service
  async sendSearch(response: SearchRequestDto | any) {
    try {
      // Initialize variables for job, course, and scholarship payloads

      this.logger.debug('on_search Response', response);
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
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error);
      return new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async select(selectRequest: SelectRequestDto) {
    try {
      this.logger.log('selectRequest', selectRequest);
      await this.globalActionService.globalSelect(selectRequest);
      // Return a success response
      return getResponse(
        true,
        coreResponseMessage.selectSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to handle search requests and delegate to the sendSearch method
  async onSelect(response: any) {
    try {
      this.logger.log(JSON.stringify(response), 'onSelect');
      await this.sendSelect(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error?.response);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async sendSelect(response: any) {
    try {
      // Initialize variables for job, course, and scholarship payloads
      let job: object, course: object, scholarship: object, retail: object;
      // Determine which type of payload to create based on the domain

      this.logger.log(response, 'sendOnselect');
      switch (response.context.domain) {
        case DomainsEnum.JOB_DOMAIN:
          job = response.message
            ? this.onestCreatePayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.COURSE_DOMAIN:
          course = response.message
            ? this.onestCreateCoursePayload.createSelectPayload(
                response.message,
              )
            : {};
          break;
        case DomainsEnum.SCHOLARSHIP_DOMAIN:
          scholarship = response.message
            ? this.onestCreateScholarshipPayload.createSelectPayload(
                response.message,
              )
            : {};
        case DomainsEnum.RETAIL_DOMAIN:
          retail = response.message
            ? this.ondcCreatePayload.createPayload(response.message)
            : {};
          break;
        default:
          break;
      }
      // Construct the payload for the search request
      const payload = {
        context: response.context,
        data: {
          job: job != null ? { context: response.context, ...job } : {},
          course:
            course != null ? { context: response.context, ...course } : {},
          scholarship:
            scholarship != null
              ? { context: response.context, ...scholarship }
              : {},
          retail:
            retail != null ? { context: response.context, ...retail } : {},
        },
      };
      this.logger.log('selectPayload', JSON.stringify(payload));

      // Construct the URL for the search request
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_select';
      // Send the search request and log the response
      const resp = await this.httpService.post(url, payload);
      this.logger.log('resp=== to core', JSON.stringify(resp));
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error);
      return new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }
  async init(initRequest: InitRequestDto) {
    try {
      // await this.dumpService.create(createDumpDto);
      this.globalActionService.globalInit(initRequest);
      // Return a success response
      return getResponse(
        true,
        coreResponseMessage.initSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async onInit(response: any) {
    try {
      this.logger.log(
        'response ==================',
        JSON.stringify(response),
        '=============================',
      );
      await this.sendInit(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error?.response);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }
  async sendInit(response: any) {
    try {
      // Initialize variables for job, course, and scholarship payloads
      let job: object, course: object, scholarship: object, retail: object;
      // Determine which type of payload to create based on the domain
      switch (response.context.domain) {
        case DomainsEnum.JOB_DOMAIN:
          job = response.message
            ? this.onestCreatePayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.COURSE_DOMAIN:
          course = response.message
            ? this.onestCreateCoursePayload.createInitPayload(response.message)
            : {};
          break;
        case DomainsEnum.SCHOLARSHIP_DOMAIN:
          scholarship = response.message
            ? this.onestCreateScholarshipPayload.createInitPayload(
                response.message,
              )
            : {};
        case DomainsEnum.RETAIL_DOMAIN:
          retail = response.message
            ? this.ondcCreatePayload.createPayload(response.message)
            : {};
          break;
        default:
          break;
      }
      // Construct the payload for the search request
      const payload = {
        context: response.context,
        data: {
          job: job != null ? { context: response.context, ...job } : {},
          course:
            course != null ? { context: response.context, ...course } : {},
          scholarship:
            scholarship != null
              ? { context: response.context, ...scholarship }
              : {},
          retail:
            retail != null ? { context: response.context, ...retail } : {},
        },
      };
      this.logger.log('initPayload', JSON.stringify(payload));

      // Construct the URL for the search request
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_init';
      // Send the search request and log the response
      const resp = await this.httpService.post(url, payload);
      this.logger.log('resp', resp);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error);
      return new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }
  async confirm(confirmRequest: ConfirmRequestDto) {
    try {
      await this.globalActionService.globalConfirm(confirmRequest);
      // Return a success response
      return getResponse(
        true,
        coreResponseMessage.confirmSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async status(statusRequest: StatusRequestDto) {
    try {
      this.globalActionService.globalStatus(statusRequest);
      // Return a success response
      return getResponse(
        true,
        coreResponseMessage.statusSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async onStatus(response: any) {
    try {
      this.logger.log(
        'response ==================',
        JSON.stringify(response),
        '=============================',
      );
      await this.sendStatus(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error?.response);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async sendStatus(response: any) {
    try {
      // Initialize variables for job, course, and scholarship payloads
      let job: object, course: object, scholarship: object, retail: object;
      // Determine which type of payload to create based on the domain
      switch (response.context.domain) {
        case DomainsEnum.JOB_DOMAIN:
          job = response.message
            ? this.onestCreatePayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.COURSE_DOMAIN:
          course = response.message
            ? this.onestCreateCoursePayload.createStatusPayload(
                response.message,
              )
            : {};
          break;
        case DomainsEnum.SCHOLARSHIP_DOMAIN:
          scholarship = response.message
            ? this.onestCreateScholarshipPayload.createStatusPayload(
                response.message,
              )
            : {};
        case DomainsEnum.RETAIL_DOMAIN:
          retail = response.message
            ? this.ondcCreatePayload.createPayload(response.message)
            : {};
          break;
        default:
          break;
      }
      // Construct the payload for the search request
      const payload = {
        context: response.context,
        data: {
          job: job != null ? { context: response.context, ...job } : {},
          course:
            course != null ? { context: response.context, ...course } : {},
          scholarship:
            scholarship != null
              ? { context: response.context, ...scholarship }
              : {},
          retail:
            retail != null ? { context: response.context, ...retail } : {},
        },
      };

      this.logger.log('statusPayload', payload);

      // Construct the URL for the search request
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_status';
      // Send the search request and log the response
      this.logger.log('resp Url to status', url);
      const resp = await this.httpService.post(url, payload);
      this.logger.log('resp Url to status', url, resp);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error);
      return new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to handle search requests and delegate to the sendSearch method
  async onConfirm(response: any) {
    try {
      await this.sendConfirm(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      this.logger.error(error?.response);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async sendConfirm(response: any) {
    try {
      // Initialize variables for job, course, and scholarship payloads
      let job: object, course: object, scholarship: object, retail: object;
      // Determine which type of payload to create based on the domain
      switch (response.context.domain) {
        case DomainsEnum.JOB_DOMAIN:
          job = response.message
            ? this.onestCreatePayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.COURSE_DOMAIN:
          course = response.message
            ? this.onestCreateCoursePayload.createConfirmPayload(
                response.message,
              )
            : {};
          break;
        case DomainsEnum.SCHOLARSHIP_DOMAIN:
          scholarship = response.message
            ? this.onestCreateScholarshipPayload.createConfirmPayload(
                response.message,
              )
            : {};
          break;
        case DomainsEnum.RETAIL_DOMAIN:
          retail = response.message
            ? this.ondcCreatePayload.createPayload(response.message)
            : {};
          break;
        default:
          break;
      }
      // Construct the payload for the search request
      const payload = {
        context: response.context,
        data: {
          job: job != null ? { context: response.context, ...job } : {},
          course:
            course != null ? { context: response.context, ...course } : {},
          scholarship:
            scholarship != null
              ? { context: response.context, ...scholarship }
              : {},
          retail:
            retail != null ? { context: response.context, ...retail } : {},
        },
      };
      this.logger.log('confirmPayload', JSON.stringify(payload));

      // Construct the URL for the search request
      const url =
        this.configService.get('CORE_SERVICE_URL') + '/stg/on_confirm';
      // Send the search request and log the response
      const resp = await this.httpService.post(url, payload);
      this.logger.log('resp', resp);
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

  async getSearchData() {
    try {
      const payload = await this.dumpService.findAll();
      // this.logger.log(payload);
      const transformedPayload = await Promise.all(
        payload.map(async (data) => {
          const messagePayload = {
            context: {
              transaction_id: data?.transaction_id,
              domain: data?.domain,
            },
            message: data?.message,
          };
          return await messagePayload;
        }),
      );
      this.logger.log(transformedPayload);
      return transformedPayload;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
