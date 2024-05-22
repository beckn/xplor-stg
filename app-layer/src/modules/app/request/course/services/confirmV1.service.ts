import { Injectable, NotFoundException } from '@nestjs/common';

import { SelectContext } from '../interface/context';
import { OnestContextConstants } from 'src/common/constants/context.constant';
import { AxiosService } from 'src/common/axios/axios.service';
import { ConfigService } from '@nestjs/config';
import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from 'src/common/constants/enums';
import { DumpService } from 'src/modules/dump/service/dump.service';
import { ConfirmRequestDto } from 'src/modules/app/dto/confirm-request.dto';
import { ICourseConfirmMessage } from '../interface/request/confirm';

@Injectable()
export class CourseConfirmService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: ConfirmRequestDto) {
    try {
      const selectRequestDetails =
        await this.dbService.findByActionTransactionId(
          request?.context?.transaction_id,
          request?.context?.domain,
          'on_search',
        );
      console.log('selectRequestDetails', selectRequestDetails);
        const context = selectRequestDetails?.context as unknown as SelectContext;
        const billing = selectRequestDetails?.message?.order?.billing
        delete billing?.id
        const fulfillments = selectRequestDetails?.message?.order?.billing
      if (!context) throw new NotFoundException('Context not found');
      const contextPayload: SelectContext = {
        ...context,
        action: Action.confirm,
          domain: DomainsEnum.COURSE_DOMAIN,
        bap_uri: this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.course}`,
        message_id: request.context.message_id,
        version: OnestContextConstants.version,
        timestamp: new Date().toISOString(),
        ttl: request.context.ttl
          ? request.context.ttl
          : OnestContextConstants.ttl,
      };
      const messagePayload: ICourseConfirmMessage = {
        order: {
          provider: {
            id: selectRequestDetails?.message?.order?.provider_id ?selectRequestDetails?.message?.order?.provider_id:request?.message?.order?.provider_id,
          },
          items:selectRequestDetails?.message?.order?.items_id[0]? [
            { id: selectRequestDetails?.message?.order?.items_id[0]},
            ...selectRequestDetails?.message?.order?.itemsId
              .slice(1)
              .map((id) => ({ id })),
              ]:[{
              id:"d4975df5-b18c-4772-80ad-368669856d52" 
          }],
          billing: billing?billing:{
            "name": "Jane Doe",
            "phone": "+91-9663088848",
            "email": "jane.doe@example.com",
            "address": "No 27, XYZ Lane, etc"
          },
          fulfillments: fulfillments?fulfillments:[
            {
              "customer": {
                "person": {
                  "name": "Jane Doe",
                  "age": "13",
                  "gender": "female"
                },
                "contact": {
                  "phone": "+91-9663088848",
                  "email": "jane.doe@example.com"
                }
              }
            }
          ],
              payments: request.message.order.payments
        },
      };

      const payload = {
        context: contextPayload,
        message: messagePayload,
      };
      return {
        ...payload,
        gatewayUrl: Gateway.course,
      };
    } catch (error) {
      return error?.message;
    }
  }

  async sendConfirmPayload(request: ConfirmRequestDto) {
    try {
        const ConfirmPayload = await this.createPayload(request);
        console.log('ConfirmPayload', ConfirmPayload)
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.course}/${Action.confirm}`;
     console.log('url', url)
      const response = await this.httpService.post(url, ConfirmPayload);
      console.log('confirmPayload', JSON.stringify(ConfirmPayload));
      return response;
    } catch (error) {
      console.log(error?.message);
      return error?.message;
    }
  }
}
