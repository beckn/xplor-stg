import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AxiosService } from './axios/axios.service';
import { GrafanaLoggerService } from '../services/grafana/service/grafana.service';
import { LoggingInterceptor } from '../util/logger-interceptor';
import { GlobalActionService } from './action/global-action';
import { JobSearchService } from '../modules/app/request/job/services/searchv1.service';
import { CourseSearchService } from '../modules/app/request/course/services/searchv1.service';
import { ScholarshipSearchService } from '../modules/app/request/scholarship/services/searchv1.service';
import { RetailSearchService } from 'src/modules/app/request/retail/services/searchv1.service';
import { CourseSelectService } from 'src/modules/app/request/course/services/selectv1.service';
import { DumpModule } from 'src/modules/dump/dump.module';
import { ScholarshipSelectService } from 'src/modules/app/request/scholarship/services/selectv1.service';
import { ScholarshipInitService } from 'src/modules/app/request/scholarship/services/initv1.service';
import { CourseInitService } from 'src/modules/app/request/course/services/initv1.service';
import { CourseConfirmService } from 'src/modules/app/request/course/services/confirmV1.service';
import { ScholarshipConfirmService } from 'src/modules/app/request/scholarship/services/confirmV1.service';

/**
 * Decorates the CommonModule class with @Global() to make it a global module.
 * This means that the providers and exports of this module will be available application-wide.
 */
@Global()
@Module({
  imports: [{ module: HttpModule, global: true }, DumpModule], // Importing HttpModule globally
  providers: [
    AxiosService, // Service for making HTTP requests
    GrafanaLoggerService, // Service for logging with Grafana
    {
      provide: APP_INTERCEPTOR, // Providing a custom interceptor for logging
      useClass: LoggingInterceptor,
    },
    GlobalActionService, // Service for handling global actions
    JobSearchService, // Service for job-related searches
    CourseSearchService, // Service for course-related searches
    ScholarshipSearchService, // Service for scholarship-related searches
    RetailSearchService, // Service for retail-related searches
    CourseSelectService, // Service for course Select operations
    ScholarshipSelectService, // Service for scholarship Select operations
    CourseInitService, // Service for course Init operations
    ScholarshipInitService, // Service for scholarship Init operations
    CourseConfirmService, // Service for course Confirm operations
    ScholarshipConfirmService, // Service for scholarship Confirm operations
  ],
  exports: [
    AxiosService, // Exporting AxiosService for use in other modules
    GrafanaLoggerService, // Exporting GrafanaLoggerService for use in other modules
    GlobalActionService, // Exporting GlobalActionService for use in other modules
    JobSearchService, // Exporting JobSearchService for use in other modules
    CourseSearchService, // Exporting CourseSearchService for use in other modules
    ScholarshipSearchService, // Exporting ScholarshipSearchService for use in other modules
    RetailSearchService, // Exporting RetailSearchService for use in other modules
    CourseSelectService, // Exporting CourseSelectService for use in other modules
    ScholarshipSelectService, // Exporting ScholarshipSelectService for use in other modules
    CourseInitService, // Service for course Init operations
    ScholarshipInitService, // Service for scholarship Init operations
    CourseConfirmService, // Service for course Confirm operations
    ScholarshipConfirmService, // Service for scholarship Confirm operations
  ],
})
// Define the CommonModule class.
/**
 * CommonModule is a placeholder class that can be used to organize and group related providers and services.
 * It is decorated with @Global() to ensure that its providers and exports are available throughout the application.
 */
export class CommonModule {}
