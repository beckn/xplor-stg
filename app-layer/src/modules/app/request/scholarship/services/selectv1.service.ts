import { Injectable } from '@nestjs/common';

import { ScholarshipSelectPayload } from '../entity/select.entity';
import { ISelectContext } from '../interface/context';
import {
  IScholarshipSelect,
  IMessageSelect,
} from '../interface/request/select';
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
import { SelectRequestDto } from 'src/modules/app/dto/select-request.dto';

@Injectable()
export class ScholarshipSelectService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: SelectRequestDto) {
    try {
      const itemsFromDb = await this.dbService.findItemByProviderId(
        request?.context?.transaction_id,
        request?.message?.order?.providerId,
        request?.message?.order?.itemsId,
        request?.context?.domain,
      );
      if (itemsFromDb === null) {
        return 'Item not found';
      } else {
        const context = itemsFromDb?.context as unknown as ISelectContext;

        const contextPayload: ISelectContext = {
          ...context,
          action: Action.select,
          domain: DomainsEnum.SCHOLARSHIP_DOMAIN,
          message_id: request.context.messageId,
          version: OnestContextConstants.version,
          timestamp: new Date().toISOString(),
          ttl: request.context.ttl
            ? request.context.ttl
            : OnestContextConstants.ttl,
        };
        itemsFromDb.context as unknown as ISelectContext;
        const messagePayload: IMessageSelect = {
          order: {
            provider: {
              id: request?.message?.order?.providerId,
            },
            items: [
              { id: request.message.order.itemsId[0] },
              ...request.message.order.itemsId.slice(1).map((id) => ({ id })),
            ],
            fulfillments: [
              { id: request.message.order.fulfillmentId[0] },
              ...request.message.order.fulfillmentId
                .slice(1)
                .map((id) => ({ id })),
            ],
          },
        };

        const payload = new ScholarshipSelectPayload(
          contextPayload,
          messagePayload,
        );
        console.log(JSON.stringify(payload));
        return {
          ...payload,
          gatewayUrl: Gateway.scholarship,
        };
      }
    } catch (error) {
      return error?.message;
    }
  }

  async sendSelectPayload(request: SelectRequestDto) {
    try {
      const selectPayload: IScholarshipSelect = await this.createPayload(
        request,
      );
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.scholarship}/${Action.select}`;
      console.log(JSON.stringify(selectPayload));
      const response = await this.httpService.post(url, selectPayload);
      return response;
    } catch (error) {
      console.log(error?.message);
      return error?.message;
    }
  }
}
