import { Injectable, Logger } from '@nestjs/common';

import { Catalog, MessageResponse, Provider } from './interface/on-search';
import {
  ICourseSelectMessage,
  ICourseSelectResponseMessageOrder,
} from './interface/on-select';
import { ICourseSelectResponseMessage } from '../job/interface/on-select';
import { ICourseInitMessage } from '../job/interface/on-init';
import { ICourseStatusMessage } from '../job/interface/on-status';
import {
  ICourseConfirmResponse,
  ICourseConfirmResponseMessage,
  ICourseConfirmResponseMessageOrder,
} from './interface/on-confirm';

/**
 * Service for handling job response operations.
 * This service is responsible for creating a payload from a message response.
 */
@Injectable()
export class CourseResponseService {
  private readonly logger = new Logger(CourseResponseService.name);

  constructor() {}

  /**
   * Creates a payload from a given message response.
   * This method constructs a MessageResponse object based on the input response, which can be of type MessageResponse or any other type.
   * It extracts and structures the catalog data from the response.
   * @param response The input response to process.
   * @returns The constructed MessageResponse object.
   */
  createPayload(response: ICourseSelectResponseMessage | any) {
    try {
      const catalog: Catalog = {
        providers: response?.catalog?.providers.map((data: Provider) => {
          return {
            id: data?.id,
            descriptor: data?.descriptor,
            categories: data?.categories?.map((data) => {
              return {
                id: data.id,
                descriptor: {
                  name: data.descriptor.name,
                },
              };
            }),
            items: data?.items,
            fulfillments: data?.fulfillments,
            locations: data?.locations,
          };
        }),
        descriptor: {
          name: response?.catalog?.descriptor?.name,
        },
      };
      const resp: MessageResponse = {
        message: {
          catalog: catalog,
        },
      };
      return resp;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }

  createSelectPayload(response: ICourseSelectResponseMessage) {
    try {
      const order: ICourseSelectResponseMessageOrder = {
        provider: {
          id: response?.order?.provider?.id,
        },
        items: response?.order?.items?.map((item) => {
          return {
            id: item?.id,
          };
        }),
        fulfillments: response?.order?.fulfillments.map((fulfillment) => {
          return {
            id: fulfillment?.id,
            agent: fulfillment?.agent,
          };
        }),
        quote: response?.order?.quote,
      };
      const resp: ICourseSelectMessage = {
        message: {
          order: order,
        },
      };
      return resp;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }

  createInitPayload(response: ICourseInitMessage) {
    try {
      const order = {
        platform_provider: {
          id: response?.order?.provider?.id,
        },
        items: response?.order?.items?.map((item) => {
          return {
            id: item?.id,
          };
        }),
        fulfillment: response?.order?.fulfillments[0]?.id
          ? {
              id: response?.order?.fulfillments[0]?.id,
            }
          : response?.order?.fulfillments,
        quote: response?.order?.quote,
        payments: response?.order?.payments,
      };
      const resp = {
        message: {
          order: order,
        },
      };
      return resp;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }

  createStatusPayload(response: ICourseStatusMessage) {
    try {
      const order = {
        id: response?.order?.id,
        status: response?.order?.fulfillments[0]?.state.descriptor.code,
      };
      const resp = {
        message: {
          order: order,
        },
      };
      return resp;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }

  createConfirmPayload(response: ICourseConfirmResponseMessage) {
    try {
      const order: ICourseConfirmResponseMessageOrder = {
        id: response?.order?.id,
        provider: {
          id: response?.order?.provider?.id,
        },
        items: response?.order?.items?.map((item) => {
          return {
            id: item?.id,
          };
        }),
        fulfillments: response?.order?.fulfillments,
        quote: response?.order?.quote,
        billing: response?.order?.billing,
        payments: response?.order?.payments,
      };
      const resp: ICourseConfirmResponse = {
        message: {
          order: order,
        },
      };
      return resp;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }
}
