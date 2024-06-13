import { Context } from '../interface/context';
import { IJobSearch, Message } from '../interface/request/search';

/**
 * Implements the IJobSearch interface to define the structure of a job search payload.
 * This class is used to encapsulate the data required for a job search operation.
 */
export class JobSearchPayload implements IJobSearch {
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
   * Constructor to initialize the JobSearchPayload with a context and a message.
   * This ensures that the payload is properly set up with the necessary information for a job search.
   */
  constructor(context: Context, message: Message) {
    (this.context = context), (this.message = message);
  }
}
