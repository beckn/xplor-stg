import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { SelectContext } from '../interface/context';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from '../../../../../common/axios/axios.service';
import { OnestContextConstants } from '../../../../../common/constants/context.constant';
import {
  DomainsEnum,
  xplorDomain,
  Gateway,
  Action,
} from '../../../../../common/constants/enums';
import { DumpService } from '../../../../dump/service/dump.service';
import { ConfirmRequestDto } from '../../../dto/confirm-request.dto';
import { ICourseConfirmMessage } from '../interface/request/confirm';

@Injectable()
export class CourseConfirmService {
  private readonly logger = new Logger(CourseConfirmService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: ConfirmRequestDto) {
    try {
      const selectRequestDetails =
        await this.dbService.findByActiontransaction_id(
          request?.context?.transaction_id,
          request?.context?.domain,
          'on_search',
        );
      this.logger.log('selectRequestDetails', selectRequestDetails);
      const context = selectRequestDetails?.context as unknown as SelectContext;
      const billing = selectRequestDetails?.message?.order?.billing;
      delete billing?.id;
      const fulfillments = selectRequestDetails?.message?.order?.fulfillment;
      if (!context) throw new NotFoundException('Context not found');
      const contextPayload: SelectContext = {
        ...context,
        action: Action.confirm,
        domain: DomainsEnum.COURSE_DOMAIN,
        bap_uri:
          this.configService.get('PROTOCOL_SERVICE_URL') +
          `/${xplorDomain.COURSE}`,
        message_id: request.context.message_id,
        transaction_id: request.context.transaction_id,
        version: OnestContextConstants.version,
        timestamp: new Date().toISOString(),
        ttl: request.context.ttl
          ? request.context.ttl
          : OnestContextConstants.ttl,
      };
      const messagePayload: ICourseConfirmMessage = {
        order: {
          provider: {
            id: selectRequestDetails?.message?.order?.provider_id
              ? selectRequestDetails?.message?.order?.provider_id
              : request?.message?.order?.provider_id,
          },
          items: selectRequestDetails?.message?.order?.items_id[0]
            ? [
                { id: selectRequestDetails?.message?.order?.items_id[0] },
                ...selectRequestDetails?.message?.order?.items_id
                  .slice(1)
                  .map((id) => ({ id })),
              ]
            : [
                {
                  id: 'd4975df5-b18c-4772-80ad-368669856d52',
                },
              ],
          billing: billing
            ? billing
            : {
                name: 'Jane Doe',
                phone: '+91-9663088848',
                email: 'jane.doe@example.com',
                address: 'No 27, XYZ Lane, etc',
              },
          fulfillments: fulfillments
            ? fulfillments
            : [
                {
                  customer: {
                    person: {
                      name: 'Jane Doe',
                      age: '13',
                      gender: 'female',
                    },
                    contact: {
                      phone: '+91-9663088848',
                      email: 'jane.doe@example.com',
                    },
                  },
                },
              ],
          payments: request.message.order.payments,
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
      this.logger.log('ConfirmPayload', ConfirmPayload);
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.COURSE}/${Action.confirm}`;
      this.logger.log('url', url);
      const response = await this.httpService.post(url, ConfirmPayload);
      this.logger.log('confirmPayload', JSON.stringify(ConfirmPayload));
      return response;
    } catch (error) {
      this.logger.error(error?.message);
      return error?.message;
    }
  }
}
