import { Context } from '../request/course/interface/context';

/**
 * Data Transfer Object (DTO) for the response of a search request.
 * Encapsulates the response data structure expected from a search operation.
 */
export class SearchResponseDto {
  /**
   * The context in which the search was performed.
   * This includes information relevant to the search operation, such as the domain, action, and other metadata.
   */
  context: Context;

  /**
   * The message or result of the search operation.
   * This typically includes the catalog of items found as a result of the search.
   * The structure of the catalog can vary depending on the specific requirements of the application.
   */
  message: {
    catalog: any;
  };
}
