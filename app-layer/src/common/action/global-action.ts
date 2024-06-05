import { Injectable, Logger } from '@nestjs/common';

import { xplorDomain } from '../.../../../common/constants/enums';
import { CourseSearchService } from '../../modules/app/request/course/services/searchv1.service';
import { Context } from '../../modules/app/request/job/interface/context';
import { Message } from '../../modules/app/request/job/interface/request/search';
import { JobSearchService } from '../../modules/app/request/job/services/searchv1.service';
import {
  OndcContextConstants,
  OnestContextConstants,
  searchContextConstants,
} from '../constants/context.constant';
import { CourseInitService } from '../../modules/app/request/course/services/initv1.service';
import { ConfirmRequestDto } from '../../modules/app/dto/confirm-request.dto';
import { InitRequestDto } from '../../modules/app/dto/init-request.dto';
import { SelectRequestDto } from '../../modules/app/dto/select-request.dto';
import { StatusRequestDto } from '../../modules/app/dto/status-request.dto';
import { CourseConfirmService } from '../../modules/app/request/course/services/confirmV1.service';
import { CourseSelectService } from '../../modules/app/request/course/services/selectv1.service';
import { CourseStatusService } from '../../modules/app/request/course/services/statusv1.service';
import { RetailSearchService } from '../../modules/app/request/retail/services/searchv1.service';
import { ScholarshipConfirmService } from '../../modules/app/request/scholarship/services/confirmV1.service';
import { ScholarshipInitService } from '../../modules/app/request/scholarship/services/initv1.service';
import { ScholarshipSearchService } from '../../modules/app/request/scholarship/services/searchv1.service';
import { ScholarshipSelectService } from '../../modules/app/request/scholarship/services/selectv1.service';
import { ScholarshipStatusService } from '../../modules/app/request/scholarship/services/statusv1.service';

@Injectable()
export class GlobalActionService {
  private readonly logger = new Logger(GlobalActionService.name);
  constructor(
    private readonly jobSearchService: JobSearchService,
    private readonly courseSearchService: CourseSearchService,
    private readonly courseSelectService: CourseSelectService,
    private readonly courseInitService: CourseInitService,
    private readonly courseConfirmService: CourseConfirmService,
    private readonly courseStatusService: CourseStatusService,
    private readonly scholarshipConfirmService: ScholarshipConfirmService,
    private readonly scholarshipInitService: ScholarshipInitService,
    private readonly scholarshipService: ScholarshipSearchService,
    private readonly scholarshipSelectService: ScholarshipSelectService,
    private readonly scholarshipStatusService: ScholarshipStatusService,
    private readonly retailService: RetailSearchService,
  ) {}

  /**
   * Performs a global search across different domains (job, course, scholarship).
   * This method iterates over the provided domain array and executes the search operation
   * for each domain using the corresponding service. It logs the search response for each domain.
   *
   * @param domain An array of domain strings indicating the type of search to perform.
   * @param context The context object containing information relevant to the search operation.
   * @param message The message object containing the search parameters.
   */
  async globalSearch(
    domain: Array<string>,
    context: Context,
    message: Message,
  ) {
    try {
      const contexts = {
        ...context,
        action: searchContextConstants.action,
        version: OnestContextConstants.version,
        timestamp: new Date().toISOString(),
        ttl: searchContextConstants.ttl,
      };
      // Iterate over each domain in the provided array
      domain.forEach(async (currentDomain) => {
        // Switch statement to handle different domains
        switch (currentDomain) {
          case xplorDomain.JOB:
            // Logic for JOB_DOMAIN
            // Perform the search operation using the JobSearchService
            const searchResponse =
              await this.jobSearchService.sendSearchPayload(contexts, message);
            // Log the search response for the job domain
            this.logger.log(`Job: ${searchResponse}`);
            break;
          case xplorDomain.COURSE:
            // Logic for COURSE_DOMAIN
            // Perform the search operation using the CourseSearchService
            const searchResponseCourse =
              await this.courseSearchService.sendSearchPayload(
                contexts,
                message,
              );
            // Log the search response for the course domain
            this.logger.log(`Course: ${JSON.stringify(searchResponseCourse)}`);
            break;
          case xplorDomain.SCHOLARSHIP:
            // Logic for SCHOLARSHIP_DOMAIN
            // Perform the search operation using the ScholarshipSearchService

            const searchResponseScholarship =
              await this.scholarshipService.sendSearchPayload(
                contexts,
                message,
              );
            // Log the search response for the scholarship domain
            this.logger.log(`Scholarship: ${searchResponseScholarship}`);
            break;
          case xplorDomain.RETAIL:
            const retailContext = {
              domain: null,
              bap_id: OndcContextConstants.bap_id,
              bap_uri: OndcContextConstants.bap_uri,
              action: searchContextConstants.action,
              core_version: OndcContextConstants.version,
              timestamp: new Date().toISOString(),
              ttl: searchContextConstants.ttl,
              message_id: context.message_id,
              transaction_id: context.transaction_id,
            };
            // Logic for RETAIL_DOMAIN
            // Perform the search operation using the RetailService
            const searchResponseRetail =
              await this.retailService.sendSearchPayload(
                retailContext,
                message,
              );
            ``;
            // Log the search response for the retail domain
            this.logger.log(`Retail: ${JSON.stringify(searchResponseRetail)}`);
            break;
          default:
            // Default case if the domain does not match any of the expected values
            // No specific action is taken here, but you could add logic to handle unexpected domains
            break;
        }
      });
    } catch (error) {
      // Catch any errors that occur during the search operations
      // Log the error for debugging purposes
      this.logger.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }

  async globalSelect(request: SelectRequestDto) {
    try {
      // Switch statement to handle different domains
      switch (request?.context?.domain) {
        case xplorDomain.JOB:
          // Logic for JOB_DOMAIN
          // Perform the search operation using the JobSearchService
          // const searchResponse =
          //   await this.jobSearchService.sendSearchPayload(contexts, message);
          // // Log the search response for the job domain
          // this.logger.log(`Job: ${searchResponse}`);
          break;
        case xplorDomain.COURSE:
          // Logic for COURSE_DOMAIN

          const selectResponseCourse =
            await this.courseSelectService.sendSelectPayload(request);
          // Log the search response for the course domain
          this.logger.log(
            `course-select: ${JSON.stringify(selectResponseCourse)}`,
          );
          break;
        case xplorDomain.SCHOLARSHIP:
          // Logic for SCHOLARSHIP_DOMAIN
          // Perform the search operation using the ScholarshipSearchService
          const searchResponseScholarship =
            await this.scholarshipSelectService.sendSelectPayload(request);
          // Log the search response for the scholarship domain
          this.logger.log(`Scholarship: ${searchResponseScholarship}`);
          break;
        default:
          // Default case if the domain does not match any of the expected values
          // No specific action is taken here, but you could add logic to handle unexpected domains

          break;
      }
    } catch (error) {
      // Catch any errors that occur during the search operations
      // Log the error for debugging purposes
      this.logger.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }

  async globalInit(request: InitRequestDto) {
    try {
      // Switch statement to handle different domains
      switch (request?.context?.domain) {
        case xplorDomain.JOB:
          // Logic for JOB_DOMAIN
          break;
        case xplorDomain.COURSE:
          // Logic for COURSE_DOMAIN
          const selectResponseCourse =
            await this.courseInitService.sendInitPayload(request);
          // Log the search response for the course domain
          this.logger.log(
            `course-init: ${JSON.stringify(selectResponseCourse)}`,
          );
          break;
        case xplorDomain.SCHOLARSHIP:
          // Logic for SCHOLARSHIP_DOMAIN
          // Perform the search operation using the ScholarshipSearchService
          const searchResponseScholarship =
            await this.scholarshipInitService.sendInitPayload(request);
          // Log the search response for the scholarship domain
          this.logger.log(`scholarship-init: ${searchResponseScholarship}`);
          break;
        default:
          // Default case if the domain does not match any of the expected values
          // No specific action is taken here, but you could add logic to handle unexpected domains

          break;
      }
    } catch (error) {
      // Catch any errors that occur during the search operations
      // Log the error for debugging purposes
      this.logger.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }

  async globalConfirm(request: ConfirmRequestDto) {
    try {
      // Switch statement to handle different domains
      switch (request?.context?.domain) {
        case xplorDomain.JOB:
          // Logic for JOB_DOMAIN
          break;
        case xplorDomain.COURSE:
          // Logic for COURSE_DOMAIN
          const selectResponseCourse =
            await this.courseConfirmService.sendConfirmPayload(request);
          // Log the search response for the course domain
          this.logger.log(
            `course-select: ${JSON.stringify(selectResponseCourse)}`,
          );
          break;
        case xplorDomain.SCHOLARSHIP:
          // Logic for SCHOLARSHIP_DOMAIN
          // Perform the search operation using the ScholarshipSearchService
          const searchResponseScholarship =
            await this.scholarshipConfirmService.sendConfirmPayload(request);
          this.logger.log(`Scholarship: ${searchResponseScholarship}`);
          break;
        default:
          // Default case if the domain does not match any of the expected values
          // No specific action is taken here, but you could add logic to handle unexpected domains

          break;
      }
    } catch (error) {
      // Catch any errors that occur during the search operations
      // Log the error for debugging purposes
      this.logger.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }

  async globalStatus(request: StatusRequestDto) {
    try {
      // Switch statement to handle different domains
      switch (request?.context?.domain) {
        case xplorDomain.JOB:
          // Logic for JOB_DOMAIN
          break;
        case xplorDomain.COURSE:
          // Logic for COURSE_DOMAIN
          const selectResponseCourse =
            await this.courseStatusService.sendStatusPayload(request);
          // Log the search response for the course domain
          this.logger.log(
            `course-status: ${JSON.stringify(selectResponseCourse)}`,
          );
          break;
        case xplorDomain.SCHOLARSHIP:
          // Logic for SCHOLARSHIP_DOMAIN
          // Perform the search operation using the ScholarshipSearchService
          const searchResponseScholarship =
            await this.scholarshipStatusService.sendStatusPayload(request);
          // Log the search response for the scholarship domain
          this.logger.log(`scholarship-status: ${searchResponseScholarship}`);
          break;
        default:
          // Default case if the domain does not match any of the expected values
          // No specific action is taken here, but you could add logic to handle unexpected domains

          break;
      }
    } catch (error) {
      // Catch any errors that occur during the search operations
      // Log the error for debugging purposes
      this.logger.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }
}
