import { Injectable } from '@nestjs/common';

import { CourseSelectPayload } from '../entity/select.entity';
import { SelectContext } from '../interface/context';
import { ICourseSelect, IMessageSelect } from '../interface/request/select';
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
export class CourseSelectService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: SelectRequestDto) {
    try {
      const itemsFromDb = await this.dbService.findItemByprovider_id(
        request?.context?.transaction_id,
        request?.message?.order?.provider_id,
        request?.message?.order?.items_id,
        request?.context?.domain,
      );
      const context = itemsFromDb.context as unknown as SelectContext;
      const contextPayload: SelectContext = {
        ...context,
        action: Action.select,
        domain: DomainsEnum.COURSE_DOMAIN,
        message_id: request.context.message_id,
        version: OnestContextConstants.version,
        timestamp: new Date().toISOString(),
        ttl: request.context.ttl
          ? request.context.ttl
          : OnestContextConstants.ttl,
      };
      itemsFromDb.context as unknown as SelectContext;
      const messagePayload: IMessageSelect = {
        order: {
          provider: {
            id: request.message.order.provider_id,
          },
          items: [
            { id: request.message.order.items_id[0] },
            ...request.message.order.items_id.slice(1).map((id) => ({ id })),
          ],
        },
      };

      const payload = new CourseSelectPayload(contextPayload, messagePayload);
      return {
        ...payload,
        gatewayUrl: Gateway.course,
      };
    } catch (error) {
      return error?.message;
    }
  }

  async sendSelectPayload(request: SelectRequestDto) {
    try {
      const selectPayload: ICourseSelect = await this.createPayload(request);

      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.course}/${Action.select}`;

      const response = await this.httpService.post(url, selectPayload);
      console.log('selectPayload', JSON.stringify(selectPayload));
      return response;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  }
}
