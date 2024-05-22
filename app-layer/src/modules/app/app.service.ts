// Import necessary modules and services
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchRequestDto } from './dto/search-request.dto';
import { GlobalActionService } from '../../common/action/global-action';
import { JobResponseService } from './response/job/job-response.service';
import { Action, DomainsEnum } from '../../common/constants/enums';
import { AxiosService } from '../../common/axios/axios.service';
import { getResponse } from '../../util/response';
import { coreResponseMessage } from '../../common/constants/http-response-message';
import { RetailResponseService } from './response/retail/retail-response.service';
import { DumpService } from '../dump/service/dump.service';
import { CreateDumpDto } from '../dump/dto/create-dump.dto';
import { SelectRequestDto } from './dto/select-request.dto';
import { ScholarshipResponseService } from './response/scholarship/scholarship-response.service';
import { CourseResponseService } from './response/course/course-response.service';
import { InitRequestDto } from './dto/init-request.dto';
import { ConfirmRequestDto } from './dto/confirm-request.dto';

// Decorator to mark this class as a provider that can be injected into other classes
@Injectable()
export class AppService {
  // Constructor to inject dependencies
  constructor(
    private readonly globalActionService: GlobalActionService, // Service for global actions
    private onestCreatePayload: JobResponseService, // Service to create job response payloads
    private onestCreateScholarshipPayload: ScholarshipResponseService, // Service to create job response payloads
    private onestCreateCoursePayload: CourseResponseService, // Service to create course response payloads

    private ondcCreatePayload: RetailResponseService, // Service to create job response payloads
    private readonly httpService: AxiosService, // Service for making HTTP requests
    private readonly configService: ConfigService, // Service for accessing configuration values
    private readonly dumpService: DumpService, // Service for dumping the request & response
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
      const createDumpDto: CreateDumpDto = {
        context: searchRequest.context,
        domains: [...searchRequest.domain],
        transaction_id: searchRequest.context.transaction_id,
        message_id: searchRequest.context.message_id,
        request_type: Action.search,
        message: searchRequest.message,
      };

      await this.dumpService.create(createDumpDto);
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
      console.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to handle search requests and delegate to the sendSearch method
  async onSearch(response: any) {
    try {
      console.log(
        'response ==================',
        JSON.stringify(response),
        '=============================',
      );
      const domain =
        response?.context?.domain === DomainsEnum.COURSE_DOMAIN
          ? 'course'
          : response?.context?.domain === DomainsEnum.JOB_DOMAIN
          ? 'job'
          : response?.context?.domain === DomainsEnum.SCHOLARSHIP_DOMAIN
          ? 'scholarship'
          : 'retail';

      // Dump the response into database
      const createDumpDto: CreateDumpDto = {
        context: response?.context,
        transaction_id: response?.context?.transaction_id,
        domain: domain,
        message_id: response?.context?.message_id,
        request_type: response?.context?.action,
        message: response?.message,
      };

      await this.dumpService.create(createDumpDto);
      // Delegate the search operation to the sendSearch method
      await this.sendSearch(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(error?.response);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to send a search request to a specific service
  async sendSearch(response: SearchRequestDto) {
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
            ? this.onestCreatePayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.SCHOLARSHIP_DOMAIN:
          scholarship = response.message
            ? this.onestCreatePayload.createPayload(response.message)
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
          job: job != null ? job : {},
          course: course != null ? course : {},
          scholarship: scholarship != null ? scholarship : {},
          retail: retail != null ? retail : {},
        },
      };
      // Construct the URL for the search request
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_search';
      // Send the search request and log the response
      const resp = await this.httpService.post(url, payload);
      console.log('resp', resp);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(error);
      return new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async select(selectRequest: SelectRequestDto) {
    try {
      console.log(selectRequest, 'selectRequest');
      await this.globalActionService.globalSelect(selectRequest);
      // Return a success response
      return getResponse(
        true,
        coreResponseMessage.searchSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to handle search requests and delegate to the sendSearch method
  async onSelect(response: any) {
    try {
      const domain =
        response?.context?.domain === DomainsEnum.COURSE_DOMAIN
          ? 'course'
          : response?.context?.domain === DomainsEnum.JOB_DOMAIN
          ? 'job'
          : response?.context?.domain === DomainsEnum.SCHOLARSHIP_DOMAIN
          ? 'scholarship'
          : 'retail';

      // Dump the response into database
      const createDumpDto: CreateDumpDto = {
        context: response?.context,
        transaction_id: response?.context?.transaction_id,
        domain: domain,
        message_id: response?.context?.message_id,
        request_type: Action.on_select,
        message: response?.message,
      };

      await this.dumpService.create(createDumpDto);
      // Delegate the search operation to the sendSearch method
      await this.sendSelect(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(error?.response);
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
          job: job != null ? job : {},
          course: course != null ? course : {},
          scholarship: scholarship != null ? scholarship : {},
          retail: retail != null ? retail : {},
        },
      };
      console.log('selectPayload', JSON.stringify(payload));

      // Construct the URL for the search request
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_select';
      // Send the search request and log the response
      const resp = await this.httpService.post(url, payload);
      console.log('resp', resp);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(error);
      return new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }
  async init(initRequest: InitRequestDto) {
    try {
      const createDumpDto: CreateDumpDto = {
        context: initRequest?.context,
        transaction_id: initRequest?.context?.transaction_id,
        domain: initRequest.context.domain,
        message_id: initRequest?.context?.message_id,
        request_type: Action.init,
        message: initRequest?.message,
      };

      await this.dumpService.create(createDumpDto);
      await this.globalActionService.globalInit(initRequest);
      // Return a success response
      return getResponse(
        true,
        coreResponseMessage.initSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async onInit(response: any) {
    try {
      console.log(
        'response ==================',
        JSON.stringify(response),
        '=============================',
      );
      const domain =
        response?.context?.domain === DomainsEnum.COURSE_DOMAIN
          ? 'course'
          : response?.context?.domain === DomainsEnum.JOB_DOMAIN
          ? 'job'
          : response?.context?.domain === DomainsEnum.SCHOLARSHIP_DOMAIN
          ? 'scholarship'
          : 'retail';

      // Dump the response into database
      const createDumpDto: CreateDumpDto = {
        context: response?.context,
        transaction_id: response?.context?.transaction_id,
        domain: domain,
        message_id: response?.context?.message_id,
        request_type: response?.context?.action,
        message: response?.message,
      };

      await this.dumpService.create(createDumpDto);
      // Delegate the search operation to the sendSearch method
      await this.sendInit(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(error?.response);
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
          job: job != null ? job : {},
          course: course != null ? course : {},
          scholarship: scholarship != null ? scholarship : {},
          retail: retail != null ? retail : {},
        },
      };
      console.log('initPayload', JSON.stringify(payload));

      // Construct the URL for the search request
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_init';
      // Send the search request and log the response
      const resp = await this.httpService.post(url, payload);
      console.log('resp', resp);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(error);
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
      console.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }
}
