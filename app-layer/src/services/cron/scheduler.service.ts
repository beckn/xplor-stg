import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
// import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, // private readonly kafkaService: KafkaService
  ) {}

  // This cron job will run at 4 AM every day
  @Cron('0 4 * * *')
  async handleCron() {
    this.logger.debug('Cron job started at 4 AM');

    try {
      const url = this.configService.get('APP_SERVICE_URL') + '/search';

      const payload = {
        domain: ['dsep-belem:courses'],
        context: {
          transaction_id: uuidv4(),
          message_id: uuidv4(),
          bap_uri: '',
        },
        message: {
          intent: {
            item: {
              descriptor: {
                name: '',
              },
            },
          },
        },
      };

      const response = await firstValueFrom(
        this.httpService.post(url, payload),
      );
      this.logger.debug('Search Response: ', response.data);
    } catch (error) {
      this.logger.error('Error while calling external API', error);
    }
  }
}
