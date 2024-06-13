import { ISelectContext } from '../context';

export interface IMessageTracking {
  order_id: string;
}

// Top-level interface combining Context and Message
export interface ICourseTrackMessage {
  context: ISelectContext;
  message: IMessageTracking;
}