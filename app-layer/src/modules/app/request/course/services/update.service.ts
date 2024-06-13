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
import { UpdateRequestDto } from '../../../dto/update-request.dto';
import { IMessageUpdate } from '../interface/request/update';

@Injectable()
export class CourseUpdateService {
  private readonly logger = new Logger(CourseUpdateService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: UpdateRequestDto) {
    try {
      if (request.context.domain === DomainsEnum.BELEM) {
        this.logger.log('request', request);

        const getItemFromDumpDb = await this.dbService.findItemByprovider_id(
          request?.message?.order?.provider_id,
          request?.message?.order?.items_id,
          request?.context?.domain,
        );
        this.logger.log(getItemFromDumpDb, 'Item from db');
        if (!getItemFromDumpDb || !getItemFromDumpDb) return null;
        const context = getItemFromDumpDb.context as unknown as SelectContext;
        const contextPayload: SelectContext = {
          ...context,
          action: Action.update,
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
        const messagePayload: IMessageUpdate = {
          update_target: 'order.fulfillments[0].customer.person.name',
          order: {
            fulfillments: [
              {
                customer: {
                  person: {
                    name: request?.message?.order?.name,
                  },
                },
              },
            ],
            id: request?.message?.order?.id,
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
        const contextPayload: SelectContext = {
          bpp_id: 'infosys.springboard.io',
          bpp_uri: 'https://infosys.springboard.io',
          action: Action.update,
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
        const messagePayload: IMessageUpdate = {
          update_target: 'order.fulfillments[0].customer.person.name',
          order: {
            fulfillments: [
              {
                customer: {
                  person: {
                    name: request?.message?.order?.name,
                  },
                },
              },
            ],
            id: request?.message?.order?.id,
          },
        };

        const payload = {
          context: contextPayload,
          message: messagePayload,
        };
        this.logger.log('updatePayload', payload);
        return {
          ...payload,
          gatewayUrl: Gateway.course,
        };
      }
    } catch (error) {
      return error?.message;
    }
  }
  async sendUpdatePayload(request: UpdateRequestDto) {
    try {
      const UpdatePayload = await this.createPayload(request);

      if (!UpdatePayload) throw new NotFoundException('Context not found');
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.COURSE}/${Action.update}`;

      this.logger.log('Update Payload', UpdatePayload);

      const response = await this.httpService.post(url, UpdatePayload);
      this.logger.log('UpdatePayload', JSON.stringify(UpdatePayload));
      return response;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }
}
