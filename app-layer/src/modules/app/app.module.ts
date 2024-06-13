import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../../config/env/env.config';
import { CommonModule } from '../../common/common.module';
import { JobSearchService } from './request/job/services/searchv1.service';
import { JobResponseService } from './response/job/job-response.service';
import { RetailResponseService } from './response/retail/retail-response.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DumpModule } from '../dump/dump.module';
import { ScholarshipResponseService } from './response/scholarship/scholarship-response.service';
import { CourseResponseService } from './response/course/course-response.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from '../../services/cron/scheduler.service';

/**
 * Module decorator for defining the module's metadata.
 * This decorator is used to organize the application's components, such as controllers and providers, and to configure global services like the configuration module.
 */
@Module({
  /**
   * Imports other modules that this module depends on.
   * In this case, it imports the ConfigModule for global configuration access and the CommonModule for common functionalities.
   */
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      /**
       * Configures the ConfigModule to be globally accessible throughout the application.
       * The 'load' option specifies the configuration file or files to be loaded.
       */
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    DumpModule,
    CommonModule,
  ],
  /**
   * Registers controllers that this module will handle requests for.
   * Here, it includes the AppController, which is responsible for handling various HTTP requests.
   */
  controllers: [AppController],
  /**
   * Registers providers that this module will use.
   * Providers can be services, factories, values, or other types of providers.
   * This module includes AppService, JobSearchService, and JobResponseService among its providers.
   */
  providers: [
    AppService,
    JobSearchService,
    JobResponseService,
    RetailResponseService,
    ScholarshipResponseService,
    CourseResponseService,
    SchedulerService,
    // KafkaService,
  ],
})
export class AppModule {}
