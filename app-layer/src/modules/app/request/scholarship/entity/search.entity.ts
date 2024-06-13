import { Context } from '../interface/context';
import { IScholarshipSearch, Message } from '../interface/request/search';

/**
 * Implements the IScholarshipSearch interface to define the structure of a scholarship search payload.
 * This class is used to encapsulate the data required for a scholarship search operation.
 */
export class ScholarshipSearchPayload implements IScholarshipSearch {
  /**
   * The context in which the search is performed.
   * This includes information relevant to the search operation, such as the domain, action, and other metadata.
   */
  context: Context;

  /**
   * The message or query to search for.
   * This typically includes the search parameters and other relevant information for the search operation.
   */
  message: Message;

  /**
   * Constructor to initialize the ScholarshipSearchPayload with a context and a message.
   * This ensures that the payload is properly set up with the necessary information for a scholarship search.
   */
  constructor(context: Context, message: Message) {
    (this.context = context), (this.message = message);
  }
}
