import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { SelectContext } from '../interface/context';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from '../../../../../common/axios/axios.service';
import {
  BelemContextConstants,
  OnestContextConstants,
} from '../../../../../common/constants/context.constant';
import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from '../../../../../common/constants/enums';
import { DumpService } from '../../../../dump/service/dump.service';
import { InitRequestDto } from '../../../dto/init-request.dto';
import { IMessageInit } from '../interface/request/init';

@Injectable()
export class CourseInitService {
  private readonly logger = new Logger(CourseInitService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: InitRequestDto) {
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
        const contextPayload: SelectContext = {
          ...context,
          action: Action.init,
          domain:
            request?.context?.domain === DomainsEnum.BELEM
              ? DomainsEnum.BELEM
              : DomainsEnum.COURSE_DOMAIN,
          transaction_id: request.context.transaction_id,
          message_id: request.context.message_id,
          bap_id:
            context?.domain === DomainsEnum.BELEM
              ? BelemContextConstants.bap_id
              : OnestContextConstants.bap_id,
          bap_uri:
            context?.domain === DomainsEnum.BELEM
              ? BelemContextConstants.bap_uri + `/${xplorDomain.COURSE}`
              : this.configService.get('PROTOCOL_SERVICE_URL') +
                `/${xplorDomain.COURSE}`,
          version: OnestContextConstants.version,
          bpp_id: getItemFromDumpDb?.context?.bpp_id,
          bpp_uri: getItemFromDumpDb?.context?.bpp_uri,
          timestamp: new Date().toISOString(),
          ttl: request.context.ttl
            ? request.context.ttl
            : OnestContextConstants.ttl,
        };
        const messagePayload: IMessageInit = {
          order: {
            provider: {
              id: request.message.order.provider_id,
            },
            items: [
              ...request.message.order.items_id.map((id) => ({ id: id })),
            ],
            billing: request.message.order.billing,
            fulfillments: [
              {
                customer: {
                  person: {
                    name: request.message.order.fulfillment[0].customer.person
                      .name,
                    age: request.message.order.fulfillment[0].customer.person
                      .age,
                    gender:
                      request.message.order.fulfillment[0].customer.person
                        .gender,
                    tags: [],
                  },
                  contact: {
                    phone:
                      request.message.order.fulfillment[0].customer.contact
                        .phone,
                    email:
                      request.message.order.fulfillment[0].customer.contact
                        .email,
                  },
                },
              },
            ],
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

        const contextPayload: SelectContext = {
          bpp_id: 'infosys.springboard.io',
          bpp_uri: 'https://infosys.springboard.io',
          action: Action.init,
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

        const messagePayload: IMessageInit = {
          order: {
            provider: {
              id: request.message.order.provider_id,
            },
            items: [
              ...request.message.order.items_id.map((id) => ({ id: id })),
            ],
            billing: request.message.order.billing,
            fulfillments: [
              {
                customer: {
                  person: {
                    name: request.message.order.fulfillment[0].customer.person
                      .name,
                    age: request.message.order.fulfillment[0].customer.person
                      .age,
                    gender:
                      request.message.order.fulfillment[0].customer.person
                        .gender,
                    tags: [],
                  },
                  contact: {
                    phone:
                      request.message.order.fulfillment[0].customer.contact
                        .phone,
                    email:
                      request.message.order.fulfillment[0].customer.contact
                        .email,
                  },
                },
              },
            ],
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

  async sendInitPayload(request: InitRequestDto) {
    try {
      const initPayload = await this.createPayload(request);
      if (!initPayload) throw new NotFoundException('Context not found');
      this.logger.log('initCreatePayload', initPayload);
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.COURSE}/${Action.init}`;

      const response = await this.httpService.post(url, initPayload);
      this.logger.log('selectPayload', JSON.stringify(initPayload));
      return response;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }
}
