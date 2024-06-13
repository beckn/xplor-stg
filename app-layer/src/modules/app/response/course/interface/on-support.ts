import { SelectContext } from 'src/modules/app/request/course/interface/context';

export interface SupportDescriptor {
  name: string;
  short_desc: string;
}

export interface SupportDoc {
  descriptor: SupportDescriptor;
  url: string;
  mime_type: string;
}

export interface ISupport {
  ref_id: string;
  order_id?: string;
  callback_phone?: string;
  email?: string;
  phone?: string;
  url?: string;
  docs?: SupportDoc[];
}

export interface ICourseSupportMessage {
  support: ISupport;
}

// Top-level interface combining Context and Message
export interface ICourseSupportResponse {
  context: SelectContext;
  message: ICourseSupportMessage;
}
