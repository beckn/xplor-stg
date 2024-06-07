import { Injectable, Logger } from '@nestjs/common';

import { CourseSelectPayload } from '../entity/select.entity';
import { SelectContext } from '../interface/context';
import { ICourseSelect, IMessageSelect } from '../interface/request/select';
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
import { SelectRequestDto } from '../../../dto/select-request.dto';
@Injectable()
export class CourseSelectService {
  private readonly logger = new Logger(CourseSelectService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: SelectRequestDto) {
    try {
      if (request?.context?.domain === DomainsEnum.BELEM) {
        this.logger.log(request, 'requestSelectPayload');
        const itemsFromDb = await this.dbService.findItemByprovider_id(
          request?.message?.order?.provider_id,
          request?.message?.order?.items_id,
          request?.context?.domain,
        );
        this.logger.log(itemsFromDb, 'Item from db');
        const context = itemsFromDb.context as unknown as SelectContext;
        const contextPayload: SelectContext = {
          ...context,
          action: Action.select,
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
        this.logger.log('contextPayload', contextPayload);
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
        this.logger.log(payload, 'Payload');
        return {
          ...payload,
          gatewayUrl:
            context?.domain === DomainsEnum.BELEM
              ? Gateway.belem
              : Gateway.course,
        };
      } else {
        // this.logger.log(request, 'requestSelectPayload');
        // const itemsFromDb = await this.dbService.findItemByprovider_id(
        //   request?.message?.order?.provider_id,
        //   request?.message?.order?.items_id,
        //   request?.context?.domain,
        // );
        // this.logger.log(itemsFromDb, 'Item from db');
        // const context = itemsFromDb.context as unknown as SelectContext;
        const contextPayload: SelectContext = {
          bpp_id: 'infosys.springboard.io',
          bpp_uri: 'https://infosys.springboard.io',
          action: Action.select,
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
        this.logger.log('contextPayload', contextPayload);
        // itemsFromDb.context as unknown as SelectContext;
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
        this.logger.log(payload, 'Payload');
        return {
          ...payload,
          gatewayUrl: Gateway.course,
        };
      }
    } catch (error) {
      return error?.message;
    }
  }

  async sendSelectPayload(request: SelectRequestDto) {
    try {
      const selectPayload: ICourseSelect = await this.createPayload(request);

      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.COURSE}/${Action.select}`;

      const response = await this.httpService.post(url, selectPayload);
      this.logger.log('selectPayload', JSON.stringify(selectPayload));
      return response;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }
}
