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
import { InitRequestDto } from 'src/modules/app/dto/init-request.dto';
import { IMessageInit } from '../interface/request/init';

@Injectable()
export class CourseInitService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: InitRequestDto) {
    try {
      const selectRequestDetails =
        await this.dbService.findByActionTransactionId(
          request?.context?.transaction_id,
          request?.context?.domain,
          'on_select',
        );

      const onSearchResponseDetails = await this.dbService.findByProviderId(
        request?.context?.transaction_id,
        request?.message?.order?.provider_id,
        request?.context?.domain,
      );
      if (!selectRequestDetails || !onSearchResponseDetails) return null;
      const context = selectRequestDetails?.context as unknown as SelectContext;
      const contextPayload: SelectContext = {
        ...context,
        action: Action.init,
        domain: DomainsEnum.COURSE_DOMAIN,
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
                  name: request.message.order.fulfillment.customer.person.name,
                  age: request.message.order.fulfillment.customer.person.age,
                  gender:
                    request.message.order.fulfillment.customer.person.gender,
                  tags: [],
                },
                contact: {
                  phone:
                    request.message.order.fulfillment.customer.contact.phone,
                  email:
                    request.message.order.fulfillment.customer.contact.email,
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
    } catch (error) {
      return error?.message;
    }
  }

  async sendInitPayload(request: InitRequestDto) {
    try {
      const initPayload = await this.createPayload(request);
      if (!initPayload) throw new NotFoundException('Context not found');
      console.log('initCreatePayload', initPayload);
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.course}/${Action.init}`;

      const response = await this.httpService.post(url, initPayload);
      console.log('selectPayload', JSON.stringify(initPayload));
      return response;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  }
}
