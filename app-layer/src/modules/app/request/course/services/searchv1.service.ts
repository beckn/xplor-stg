import { Injectable } from '@nestjs/common';

import { CourseSearchPayload } from '../entity/search.entity';
import { Context } from '../interface/context';
import { ICourseSearch, Message } from '../interface/request/search';
import { OnestContextConstants } from 'src/common/constants/context.constant';
import { AxiosService } from 'src/common/axios/axios.service';
import { ConfigService } from '@nestjs/config';
import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from 'src/common/constants/enums';

/**
 * Service for handling course search operations.
 * This service is responsible for creating and sending search payloads for course-related queries.
 */
@Injectable()
export class CourseSearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
  ) {}

  /**
   * Creates a payload for a course search operation.
   * This method constructs a CourseSearchPayload object with the necessary context and query information.
   * @param context The context in which the search is performed.
   * @param query The query parameters for the search.
   * @returns The constructed payload.
   */
  createPayload(context: Context, query: Message) {
    try {
      const contextPayload: Context = {
        ...context,
        bap_id: OnestContextConstants.bap_id,
        bap_uri:
          this.configService.get('PROTOCOL_SERVICE_URL') +
          `/${xplorDomain.course}`,
        domain: DomainsEnum.COURSE_DOMAIN,
      };
      const message: Message = query;
      const payload = new CourseSearchPayload(contextPayload, message);
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
      const searchPayload: ICourseSearch = this.createPayload(context, query);

      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.course}/${Action.search}`;

      const response = await this.httpService.post(url, searchPayload);
      return response;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  }
}
