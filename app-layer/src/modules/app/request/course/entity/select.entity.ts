// Import necessary interfaces and types from other modules
import { SelectContext } from '../interface/context';
import {
  ICourseSelect,
  IMessageSelect as Message,
} from '../interface/request/select';

/**
 * Represents the payload for selecting courses.
 * This class encapsulates the context and message related to course selection requests,
 * adhering to the ICourseSelect interface.
 */
export class CourseSelectPayload implements ICourseSelect {
  // The context object containing relevant application-wide data or configurations
  context: SelectContext;

  // The message object detailing the specific request parameters for course selection
  message: Message;

  /**
   * Constructs a new instance of CourseSelectPayload.
   * Initializes the context and message properties based on the provided arguments.
   *
   * @param context The application context required for processing the request.
   * @param message The detailed message specifying the course selection criteria.
   */
  constructor(context: SelectContext, message: Message) {
    // Assigns the provided context and message to the corresponding properties
    this.context = context;
    this.message = message;
  }
}
