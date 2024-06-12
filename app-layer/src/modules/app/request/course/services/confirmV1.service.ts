import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { SelectContext } from '../interface/context';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from '../../../../../common/axios/axios.service';
import {
  BelemContextConstants,
  OnestContextConstants,
} from '../../../../../common/constants/context.constant';
import {
  DomainsEnum,
  xplorDomain,
  Gateway,
  Action,
} from '../../../../../common/constants/enums';
import { DumpService } from '../../../../dump/service/dump.service';
import { ConfirmRequestDto } from '../../../dto/confirm-request.dto';

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
      if (request.context.domain === DomainsEnum.BELEM) {
        this.logger.log(request?.message?.order, 'Item from request');
        const getItemFromDumpDb =
          await await this.dbService.findItemByprovider_id(
            request?.message?.order?.provider_id,
            request?.message?.order?.items_id,
            request?.context?.domain,
          );
        this.logger.log(getItemFromDumpDb, 'Item from db');
        if (!getItemFromDumpDb || !getItemFromDumpDb) return null;
        const context = getItemFromDumpDb?.context as unknown as SelectContext;
        const billing = request?.message?.order?.billing;
        delete billing?.id;
        const fulfillments = request?.message?.order?.fulfillments;
        if (!context) throw new NotFoundException('Context not found');
        const contextPayload: SelectContext = {
          ...context,
          action: Action.confirm,
          domain:
            request?.context?.domain === DomainsEnum.BELEM
              ? DomainsEnum.BELEM
              : DomainsEnum.COURSE_DOMAIN,
          bap_id:
            context?.domain === DomainsEnum.BELEM
              ? BelemContextConstants.bap_id
              : OnestContextConstants.bap_id,
          bap_uri:
            context?.domain === DomainsEnum.BELEM
              ? BelemContextConstants.bap_uri + `/${xplorDomain.COURSE}`
              : this.configService.get('PROTOCOL_SERVICE_URL') +
                `/${xplorDomain.COURSE}`,
          message_id: request.context.message_id,
          transaction_id: request.context.transaction_id,
          version: OnestContextConstants.version,
          timestamp: new Date().toISOString(),
          ttl: request.context.ttl
            ? request.context.ttl
            : OnestContextConstants.ttl,
        };
        const messagePayload = {
          order: {
            provider: {
              id: request?.message?.order?.provider_id,
            },
            items: [
              {
                id: request?.message?.order?.items_id[0],
              },
            ],
            billing: billing,
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
      } else {
        this.logger.log(request?.message?.order, 'Item from request');

        const billing = request?.message?.order?.billing;
        delete billing?.id;
        const fulfillments = request?.message?.order?.fulfillments;

        const contextPayload: SelectContext = {
          bpp_id: 'infosys.springboard.io',
          bpp_uri: 'https://infosys.springboard.io',
          action: Action.confirm,
          domain: request?.context?.domain,
          bap_id: OnestContextConstants.bap_id,
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
        const messagePayload = {
          order: {
            provider: {
              id: request?.message?.order?.provider_id,
            },
            items: [
              {
                id: request?.message?.order?.items_id[0],
              },
            ],
            billing: billing,
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
      }
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
