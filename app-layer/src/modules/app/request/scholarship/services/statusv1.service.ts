import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DumpService } from '../../../../dump/service/dump.service';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from '../../../../../common/axios/axios.service';
import { OnestContextConstants } from '../../../../../common/constants/context.constant';
import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from '../../../../../common/constants/enums';
import { StatusRequestDto } from '../../../dto/status-request.dto';
import { SelectContext } from '../../course/interface/context';
import { IMessageStatus } from '../interface/request/status';

@Injectable()
export class ScholarshipStatusService {
  private readonly logger = new Logger(ScholarshipStatusService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: StatusRequestDto) {
    try {
      const initRequestDetails =
        await this.dbService.findByActiontransaction_id(
          request?.context?.transaction_id,
          request?.context?.domain,
          'on_init',
        );
      if (!initRequestDetails) return null;
      const context = initRequestDetails?.context as unknown as SelectContext;
      const contextPayload: SelectContext = {
        ...context,
        action: Action.status,
        domain: DomainsEnum.SCHOLARSHIP_DOMAIN,
        transaction_id: request.context.transaction_id,
        message_id: request.context.message_id,
        version: OnestContextConstants.version,
        bpp_id: initRequestDetails?.context?.bpp_id,
        bpp_uri: initRequestDetails?.context?.bpp_uri,
        timestamp: new Date().toISOString(),
        ttl: request.context.ttl
          ? request.context.ttl
          : OnestContextConstants.ttl,
      };
      const messagePayload: IMessageStatus = {
        order_id: request?.message?.order?.id,
      };

      const payload = {
        context: contextPayload,
        message: messagePayload,
      };
      return {
        ...payload,
        gatewayUrl: Gateway.scholarship,
      };
    } catch (error) {
      return error?.message;
    }
  }
  async sendStatusPayload(request: StatusRequestDto) {
    try {
      const statusPayload = await this.createPayload(request);
      if (!statusPayload) throw new NotFoundException('Context not found');
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.SCHOLARSHIP}/${Action.status}`;

      const response = await this.httpService.post(url, statusPayload);
      this.logger.log('statusPayload', JSON.stringify(statusPayload));
      return response;
    } catch (error) {
      this.logger.error(error);
      return error?.message;
    }
  }
}
