import { Injectable, Logger } from '@nestjs/common';

import { Catalog, MessageResponse, Provider } from './interface/on-search';
import {
  IScholarshipSelectMessage,
  IScholarshipSelectResponseMessage,
  IScholarshipSelectResponseMessageOrder,
} from './interface/on-select';
import { ICourseInitMessage } from '../job/interface/on-init';
import { ICourseStatusMessage } from '../job/interface/on-status';
import {
  IScholarshipConfirmResponse,
  IScholarshipConfirmResponseMessage,
  IScholarshipConfirmResponseMessageOrder,
} from './interface/on-confirm';

/**
 * Service for handling job response operations.
 * This service is responsible for creating a payload from a message response.
 */
@Injectable()
export class ScholarshipResponseService {
  private readonly logger = new Logger(ScholarshipResponseService.name);

  constructor() {}

  /**
   * Creates a payload from a given message response.
   * This method constructs a MessageResponse object based on the input response, which can be of type MessageResponse or any other type.
   * It extracts and structures the catalog data from the response.
   * @param response The input response to process.
   * @returns The constructed MessageResponse object.
   */
  createPayload(response: IScholarshipSelectResponseMessage | any) {
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

  /**
   * Constructs a payload for a select operation based on the provided response.
   * This method is used to format the response received from the select operation
   * into a specific payload structure expected by the system for further processing.
   *
   * @param response The response object from the select operation, containing details about the selected scholarships.
   * @returns An object representing the formatted payload for the select operation.
   */
  createSelectPayload(response: IScholarshipSelectResponseMessage) {
    try {
      // Initialize the order object with necessary properties extracted from the response.
      this.logger.log(response, 'schoilarResonsiveService');
      const order: IScholarshipSelectResponseMessageOrder = {
        provider: {
          id: response?.order?.provider?.id, // Extracts the provider ID.
        },
        items: response?.order?.items?.map((item) => ({
          // Maps over items to extract IDs.
          id: item?.id,
        })),
        fulfillments: response?.order?.fulfillments.map((fulfillment) => ({
          // Maps over fulfillments to extract IDs and agents.
          id: fulfillment?.id,
          agent: fulfillment?.agent,
        })),
        quote: response?.order?.quote, // Directly assigns the quote object.
      };

      // Constructs the response object with the formatted order.
      const resp: IScholarshipSelectMessage = {
        message: {
          order: order,
        },
      };

      // Returns the constructed response object.
      return resp;
    } catch (error) {
      // Logs the error and returns the error message if an exception occurs.
      this.logger.error(error);
      return error?.message;
    }
  }

  /**
   * Constructs a payload for a confirm operation based on the provided response.
   * This method is used to format the response received from the confirm operation
   * into a specific payload structure expected by the system for further processing.
   *
   * @param response The response object from the confirm operation, containing detailed confirmation information.
   * @returns An object representing the formatted payload for the confirm operation.
   */
  createConfirmPayload(response: IScholarshipConfirmResponseMessage) {
    try {
      // Initializes the order object with necessary properties extracted from the response.
      const order: IScholarshipConfirmResponseMessageOrder = {
        id: response?.order?.id, // Assigns the order ID directly.
        provider: {
          id: response?.order?.provider?.id, // Extracts the provider ID.
        },
        items: response?.order?.items?.map((item) => ({
          // Maps over items to extract IDs.
          id: item?.id,
        })),
        fulfillments: response?.order?.fulfillments, // Assumes fulfillments are already in the correct format.
        quote: response?.order?.quote, // Directly assigns the quote object.
        docs: response?.order?.docs, // Directly assigns the documents array.
        payments: response?.order?.payments, // Directly assigns the payments array.
        billing: response?.order?.billing, // Directly assigns the billing object.
        cancellation_terms: response?.order?.cancellation_terms, // Directly assigns the cancellation terms array.
      };

      // Constructs the response object with the formatted order.
      const resp: IScholarshipConfirmResponse = {
        message: {
          order: order,
        },
      };

      // Returns the constructed response object.
      return resp;
    } catch (error) {
      // Logs the error and returns the error message if an exception occurs.
      this.logger.error(error);
      return error?.message;
    }
  }

  createInitPayload(response: ICourseInitMessage) {
    try {
      const order = {
        provider_id: response?.order?.provider?.id,
        items: response?.order.items,
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
}
