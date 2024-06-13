import { Context } from '../interface/context';
import { ICourseSearch, Message } from '../interface/request/search';

/**
 * Implements the ICourseSearch interface to define the structure of a course search payload.
 * This class is used to encapsulate the data required for a course search operation.
 */
export class CourseSearchPayload implements ICourseSearch {
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
   * Constructor to initialize the CourseSearchPayload with a context and a message.
   * This ensures that the payload is properly set up with the necessary information for a course search.
   */
  constructor(context: Context, message: Message) {
    (this.context = context), (this.message = message);
  }
}
