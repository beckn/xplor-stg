import { SelectContext } from '../context';

export interface IMessageTracking {
  order_id: string;
}

// Top-level interface combining Context and Message
export interface TrackingRequest {
  context: SelectContext;
  message: IMessageTracking;
}
