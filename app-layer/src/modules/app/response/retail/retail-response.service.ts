import { Injectable, Logger } from '@nestjs/common';
import { Catalog, MessageResponse, Provider } from './interface/on-search';

/**
 * Service for handling job response operations.
 * This service is responsible for creating a payload from a message response.
 */
@Injectable()
export class RetailResponseService {
  private readonly logger = new Logger(RetailResponseService.name);

  constructor() {}

  /**
   * Creates a payload from a given message response.
   * This method constructs a MessageResponse object based on the input response, which can be of type MessageResponse or any other type.
   * It extracts and structures the catalog data from the response.
   * @param response The input response to process.
   * @returns The constructed MessageResponse object.
   */
  createPayload(response: MessageResponse | any) {
    try {
      const catalog: Catalog = {
        providers:
          response?.catalog != null ? response?.catalog['bpp/providers'] : [],
        descriptor:
          response?.catalog != null ? response?.catalog['bpp/descriptor'] : {},
        fulfillments:
          response?.catalog != null
            ? response?.catalog['bpp/fulfillments']
            : {},
      };
      catalog.providers = catalog?.providers?.map((provider: Provider) => {
        provider?.items?.map((item) => {
          item.price.value = item.price.value.toString();
          item.price.maximum_value = item.price.maximum_value.toString();
          return item;
        });
        return provider;
      });
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
}
