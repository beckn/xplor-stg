import { Injectable, Logger } from '@nestjs/common';

import { CourseSearchPayload } from '../entity/search.entity';
import { Context } from '../interface/context';
import { ICourseSearch, Message } from '../interface/request/search';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from '../../../../../common/axios/axios.service';
import {
  BelemContextConstants,
  OnestContextConstants,
} from '../../../../../common/constants/context.constant';
import {
  xplorDomain,
  DomainsEnum,
  Gateway,
  Action,
} from '../../../../../common/constants/enums';
/**
 * Service for handling course search operations.
 * This service is responsible for creating and sending search payloads for course-related queries.
 */
@Injectable()
export class CourseSearchService {
  private readonly logger = new Logger(CourseSearchService.name);

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
        bap_id:
          context?.domain === DomainsEnum.BELEM
            ? BelemContextConstants.bap_id
            : OnestContextConstants.bap_id,
        bap_uri:
          context?.domain === DomainsEnum.BELEM
            ? BelemContextConstants.bap_uri + `/${xplorDomain.COURSE}`
            : this.configService.get('PROTOCOL_SERVICE_URL') +
              `/${xplorDomain.COURSE}`,
        domain:
          context?.domain === DomainsEnum.BELEM
            ? DomainsEnum.BELEM
            : DomainsEnum.COURSE_DOMAIN,
      };
      const message: Message = query;
      const payload = new CourseSearchPayload(contextPayload, message);
      console.log('payload==============', payload);
      return {
        ...payload,
        gatewayUrl:
          context?.domain === DomainsEnum.BELEM
            ? Gateway.belem
            : Gateway.course,
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
        `/${xplorDomain.COURSE}/${Action.search}`;

      const response = await this.httpService.post(url, searchPayload);
      return response;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }
}
