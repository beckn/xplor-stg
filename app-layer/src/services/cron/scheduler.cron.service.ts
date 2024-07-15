import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import { xplorDomain } from 'src/common/constants/enums';
// import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, // private readonly kafkaService: KafkaService
  ) {}

  // This cron job will run at 4 AM every day
  @Cron('0 */2 * * *')
  async handleCron() {
    this.logger.debug('Cron job started at every 2 hour');

    try {
      const url = this.configService.get('APP_SERVICE_URL') + '/search';
      const domains: Array<string> = this.configService.get('DOMAINS')
        ? this.configService.get('DOMAINS').split(' ')
        : [xplorDomain.BELEM];
      domains.forEach(async (domain) => {
        const payload = {
          context: {
            domain: domain,
          },
          searchString: '',
          cron: true,
        };

        const response = await firstValueFrom(
          this.httpService.post(url, payload),
        );
        this.logger.debug('Search Response: ', response.data);
        const url1 =
          this.configService.get('IL_SERVICE_URL') + '/stg/fetch-search-data';
        setTimeout(async () => {
          this.logger.log('Calling external API...', url1);
          const response$ = this.httpService.get(url1); // Keep it as an Observable
          try {
            const response = await firstValueFrom(response$); // Use firstValueFrom to convert Observable to Promise
            this.logger.log(
              'IL Search Response: ',
              JSON.stringify(response.data),
            );
          } catch (error) {
            this.logger.error('Error fetching search data:', error);
          }
        }, 30 * 60 * 1000);
      });

      // Execute after 30 minutes
    } catch (error) {
      this.logger.error('Error while calling external API', error);
    }
  }
}
