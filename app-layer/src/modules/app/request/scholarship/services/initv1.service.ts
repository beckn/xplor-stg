import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { IMessageInit } from '../interface/request/init';
import { SelectContext } from '../../course/interface/context';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from '../../../../../common/axios/axios.service';
import { OnestContextConstants } from '../../../../../common/constants/context.constant';
import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from '../../../../../common/constants/enums';
import { DumpService } from '../../../../dump/service/dump.service';
import { InitRequestDto } from '../../../dto/init-request.dto';

@Injectable()
export class ScholarshipInitService {
  private readonly logger = new Logger(ScholarshipInitService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: InitRequestDto) {
    try {
      this.logger.log('request', JSON.stringify(request));
      const selectRequestDetails =
        await this.dbService.findByActiontransaction_id(
          request?.context?.transaction_id,
          request?.context?.domain,
          'on_select',
        );

      const onSearchResponseDetails = await this.dbService.findByprovider_id(
        request?.context?.transaction_id,
        request?.message?.order?.provider_id,
        request?.context?.domain,
      );
      this.logger.log(
        'selectRequestSetails',
        selectRequestDetails,
        onSearchResponseDetails,
      );
      if (!selectRequestDetails || !onSearchResponseDetails) return null;
      const context = selectRequestDetails?.context as unknown as SelectContext;
      const contextPayload: SelectContext = {
        ...context,
        action: Action.init,
        domain: DomainsEnum.SCHOLARSHIP_DOMAIN,
        transaction_id: request.context.transaction_id,
        message_id: request.context.message_id,
        version: OnestContextConstants.version,
        bpp_id: onSearchResponseDetails?.context?.bpp_id,
        bpp_uri: onSearchResponseDetails?.context?.bpp_uri,
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
          items: [...request.message.order.items_id.map((id) => ({ id: id }))],
          billing: request.message.order.billing,
          fulfillments: [
            {
              customer: {
                person: {
                  name: request.message.order.fulfillment[0].customer.person
                    .name,
                  age: request.message.order.fulfillment[0].customer.person.age,
                  gender:
                    request.message.order.fulfillment[0].customer.person.gender,
                  tags: [],
                },
                contact: {
                  phone:
                    request.message.order.fulfillment[0].customer.contact.phone,
                  email:
                    request.message.order.fulfillment[0].customer.contact.email,
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
      this.logger.log('ScholarshipPayload', payload);
      return {
        ...payload,
        gatewayUrl: Gateway.scholarship,
      };
    } catch (error) {
      return error?.message;
    }
  }

  async sendInitPayload(request: InitRequestDto) {
    try {
      const initPayload = await this.createPayload(request);
      if (!initPayload) throw new NotFoundException('Context not found');
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.SCHOLARSHIP}/${Action.init}`;

      const response = await this.httpService.post(url, initPayload);
      this.logger.log('initPayload', JSON.stringify(initPayload));
      return response;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }
}
