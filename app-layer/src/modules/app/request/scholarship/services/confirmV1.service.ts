import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ISelectContext } from '../interface/context';
import { IScholarshipConfirmMessage } from '../interface/request/confirm';
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

@Injectable()
export class ScholarshipConfirmService {
  private readonly logger = new Logger(ScholarshipConfirmService.name);

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
      const context =
        selectRequestDetails?.context as unknown as ISelectContext;
      const billing = selectRequestDetails?.message?.order?.billing;
      delete billing?.id;
      const fulfillments = selectRequestDetails?.message?.order?.billing;
      if (!context) throw new NotFoundException('Context not found');
      const contextPayload: ISelectContext = {
        ...context,
        action: Action.confirm,
        domain: DomainsEnum.SCHOLARSHIP_DOMAIN,
        bap_uri:
          this.configService.get('PROTOCOL_SERVICE_URL') +
          `/${xplorDomain.SCHOLARSHIP}`,
        transaction_id: request.context.transaction_id,
        message_id: request.context.message_id,
        version: OnestContextConstants.version,
        timestamp: new Date().toISOString(),
        ttl: request.context.ttl
          ? request.context.ttl
          : OnestContextConstants.ttl,
      };
      this.logger.log(request?.message?.order?.items_id[0]);
      const messagePayload: IScholarshipConfirmMessage = {
        order: {
          provider: {
            id: selectRequestDetails?.message?.order?.provider_id
              ? selectRequestDetails?.message?.order?.provider_id
              : request?.message?.order?.provider_id,
          },
          items: [
            {
              id: request?.message?.order?.items_id[0],
            },
          ],
          billing: billing
            ? billing
            : {
                name: 'Manjunath',
                organization: {
                  descriptor: {
                    name: 'Namma Yatri',
                    code: 'nammayatri.in',
                  },
                  contact: {
                    phone: '+91-8888888888',
                    email: 'scholarships@nammayatri.in',
                  },
                },
                address: 'No 27, XYZ Lane, etc',
                phone: '+91-9999999999',
              },
          fulfillments: fulfillments
            ? fulfillments
            : [
                {
                  customer: {
                    id: 'aadhaar:798677675565',
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
          payment: request.message.order.payments,
        },
      };

      const payload = {
        context: contextPayload,
        message: messagePayload,
      };
      this.logger.log('paylooooad', 'payload');
      return {
        ...payload,
        gatewayUrl: Gateway.scholarship,
      };
    } catch (error) {
      this.logger.error(error?.message);
      return error?.message;
    }
  }

  async sendConfirmPayload(request: ConfirmRequestDto) {
    try {
      const ConfirmPayload = await this.createPayload(request);
      this.logger.log('ConfirmPayload', ConfirmPayload);
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.SCHOLARSHIP}/${Action.confirm}`;
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
