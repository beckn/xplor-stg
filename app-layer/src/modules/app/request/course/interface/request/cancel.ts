interface Descriptor {
  short_desc: string;
}

export interface IMessageCancel {
  order_id: string;
  cancellation_reason_id: string;
  descriptor: Descriptor;
}

interface Context {
  domain: string;
  version: string;
  action: string;
  bap_id: string;
  bap_uri: string;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: string;
}

// Top-level interface combining Context and Message
export interface CancelRequest {
  context: Context;
  message: IMessageCancel;
}
