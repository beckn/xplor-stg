import { SelectContext } from 'src/modules/app/request/course/interface/context';

interface Tracking {
  id: string;
  url: string;
  status: string;
}

export interface ICourseTrackingMessage {
  tracking: Tracking;
}

// Top-level interface combining Context and Message
export interface TrackRequest {
  context: SelectContext;
  message: ICourseTrackingMessage;
}
