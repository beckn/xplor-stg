import { Injectable } from '@nestjs/common';

import { xplorDomain } from '../.../../../common/constants/enums';
import { CourseSearchService } from '../../modules/app/request/course/services/searchv1.service';
import { Context } from '../../modules/app/request/job/interface/context';
import { Message } from '../../modules/app/request/job/interface/request/search';
import { JobSearchService } from '../../modules/app/request/job/services/searchv1.service';
import { ScholarshipSearchService } from 'src/modules/app/request/scholarship/services/searchv1.service';
import { RetailSearchService } from 'src/modules/app/request/retail/services/searchv1.service';
import {
  OndcContextConstants,
  OnestContextConstants,
  searchContextConstants,
} from '../constants/context.constant';
import { CourseSelectService } from 'src/modules/app/request/course/services/selectv1.service';
import { SelectRequestDto } from 'src/modules/app/dto/select-request.dto';
import { ScholarshipSelectService } from 'src/modules/app/request/scholarship/services/selectv1.service';
import { InitRequestDto } from 'src/modules/app/dto/init-request.dto';
import { CourseInitService } from 'src/modules/app/request/course/services/initv1.service';
import { ScholarshipInitService } from 'src/modules/app/request/scholarship/services/initv1.service';

@Injectable()
export class GlobalActionService {
  constructor(
    private readonly jobSearchService: JobSearchService,
    private readonly courseSearchService: CourseSearchService,
    private readonly courseSelectService: CourseSelectService,
    private readonly courseInitService: CourseInitService,
    private readonly scholarshipInitService: ScholarshipInitService,
    private readonly scholarshipService: ScholarshipSearchService,
    private readonly scholarshipSelectService: ScholarshipSelectService,
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
          case xplorDomain.job:
            // Logic for JOB_DOMAIN
            // Perform the search operation using the JobSearchService
            const searchResponse =
              await this.jobSearchService.sendSearchPayload(contexts, message);
            // Log the search response for the job domain
            console.log(`Job: ${searchResponse}`);
            break;
          case xplorDomain.course:
            // Logic for COURSE_DOMAIN
            // Perform the search operation using the CourseSearchService
            const searchResponseCourse =
              await this.courseSearchService.sendSearchPayload(
                context,
                message,
              );
            // Log the search response for the course domain
            console.log(`Course: ${JSON.stringify(searchResponseCourse)}`);
            break;
          case xplorDomain.scholarship:
            // Logic for SCHOLARSHIP_DOMAIN
            // Perform the search operation using the ScholarshipSearchService

            const searchResponseScholarship =
              await this.scholarshipService.sendSearchPayload(
                contexts,
                message,
              );
            // Log the search response for the scholarship domain
            console.log(`Scholarship: ${searchResponseScholarship}`);
            break;
          case xplorDomain.retail:
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
            // Log the search response for the retail domain
            console.log(`Retail: ${JSON.stringify(searchResponseRetail)}`);
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
      console.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }

  async globalSelect(request: SelectRequestDto) {
    try {
      // Switch statement to handle different domains
      switch (request?.context?.domain) {
        case xplorDomain.job:
          // Logic for JOB_DOMAIN
          // Perform the search operation using the JobSearchService
          // const searchResponse =
          //   await this.jobSearchService.sendSearchPayload(contexts, message);
          // // Log the search response for the job domain
          // console.log(`Job: ${searchResponse}`);
          break;
        case xplorDomain.course:
          // Logic for COURSE_DOMAIN

          const selectResponseCourse =
            await this.courseSelectService.sendSelectPayload(request);
          // Log the search response for the course domain
          console.log(`course-select: ${JSON.stringify(selectResponseCourse)}`);
          break;
        case xplorDomain.scholarship:
          // Logic for SCHOLARSHIP_DOMAIN
          // Perform the search operation using the ScholarshipSearchService
          const searchResponseScholarship =
            await this.scholarshipSelectService.sendSelectPayload(request);
          // Log the search response for the scholarship domain
          console.log(`Scholarship: ${searchResponseScholarship}`);
          break;
        default:
          // Default case if the domain does not match any of the expected values
          // No specific action is taken here, but you could add logic to handle unexpected domains

          break;
      }
    } catch (error) {
      // Catch any errors that occur during the search operations
      // Log the error for debugging purposes
      console.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }

  async globalInit(request: InitRequestDto) {
    try {
      // Switch statement to handle different domains
      switch (request?.context?.domain) {
        case xplorDomain.job:
          // Logic for JOB_DOMAIN
          break;
        case xplorDomain.course:
          // Logic for COURSE_DOMAIN
          const selectResponseCourse =
            await this.courseInitService.sendInitPayload(request);
          // Log the search response for the course domain
          console.log(`course-select: ${JSON.stringify(selectResponseCourse)}`);
          break;
        case xplorDomain.scholarship:
          // Logic for SCHOLARSHIP_DOMAIN
          // Perform the search operation using the ScholarshipSearchService
          const searchResponseScholarship =
            await this.scholarshipInitService.sendInitPayload(request);
          // Log the search response for the scholarship domain
          console.log(`Scholarship: ${searchResponseScholarship}`);
          break;
        default:
          // Default case if the domain does not match any of the expected values
          // No specific action is taken here, but you could add logic to handle unexpected domains

          break;
      }
    } catch (error) {
      // Catch any errors that occur during the search operations
      // Log the error for debugging purposes
      console.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }
}
