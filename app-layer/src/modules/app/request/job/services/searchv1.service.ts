import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JobSearchPayload } from '../entity/search.entity';
import { Context } from '../interface/context';
import { IJobSearch, Message } from '../interface/request/search';
import { contextConstant } from '../../../../../common/constants/context.constant';
import { AxiosService } from '../../../../../common/axios/axios.service';

import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from '../../../../../common/constants/enums';

/**
 * Service for handling job search operations.
 * This service is responsible for creating and sending search payloads for job-related queries.
 */
@Injectable()
export class JobSearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
  ) {}

  /**
   * Creates a payload for a job search operation.
   * This method constructs a JobSearchPayload object with the necessary context and query information.
   * @param context The context in which the search is performed.
   * @param query The query parameters for the search.
   * @returns The constructed payload.
   */
  createPayload(context: Context, query: Message) {
    try {
      const contextPayload: Context = {
        ...context,
        bap_id: contextConstant.bap_id,
        bap_uri:
          this.configService.get('PROTOCOL_SERVICE_URL') +
          `/${xplorDomain.job}`,
        domain: DomainsEnum.JOB_DOMAIN,
      };
      const message: Message = query;
      const payload = new JobSearchPayload(contextPayload, message);
      return {
        ...payload,
        gatewayUrl: Gateway.course,
      };
    } catch (error) {
      return error?.message;
    }
  }

  /**
   * Sends a search payload to the appropriate service.
   * This method sends the constructed payload to the service endpoint and returns the response.
   * @param context The context in which the search is performed.
   * @param query The query parameters for the search.
   * @returns The response from the service.
   */
  async sendSearchPayload(context: Context, query: Message) {
    try {
      const searchPayload: IJobSearch = this.createPayload(context, query);
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.job}/${Action.search}`;
      console.log(url);

      const response = await this.httpService.post(url, searchPayload);
      return response;
    } catch (error) {
      console.log(error?.message);
      return error?.message;
    }
  }
}
