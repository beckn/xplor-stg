import { SelectContext } from 'src/modules/app/request/course/interface/context';

interface Form {
  url: string;
  mime_type: string;
}

interface FeedbackForm {
  form: Form;
  required: string;
}

export interface ICourseRatingMessage {
  feedback_form: FeedbackForm;
}

// Top-level interface combining Context and Message
export interface ICourseRatingRequest {
  context: SelectContext;
  message: ICourseRatingMessage;
}
