import { ISelectContext } from '../context';

interface RatingCategory {
  id: string;
  rating_category: string;
  value: string;
}

export interface IMessageRating {
  ratings: RatingCategory;
}

// Top-level interface combining Context and Message
export interface ICourseRatingMessage {
  context: ISelectContext;
  message: IMessageRating;
}
