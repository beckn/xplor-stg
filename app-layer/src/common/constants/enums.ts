/**
 * Enum representing different domains within the application.
 * Each domain corresponds to a specific area of functionality or service.
 */
export enum DomainsEnum {
  JOB_DOMAIN = 'onest:work-opportunities', // Domain for job-related services
  COURSE_DOMAIN = 'onest:learning-experiences', // Domain for course-related services
  SCHOLARSHIP_DOMAIN = 'onest:financial-support', // Domain for scholarship-related services
  RETAIL_DOMAIN = 'ONDC:RET10', // Domain for retail-related services
  BELEM = 'dsep-belem:courses', // Domain for belem course
}

/**
 * Object mapping domain names to their corresponding identifiers.
 * Used for internal reference and consistency across the application.
 */
export enum xplorDomain {
  COURSE = 'course', // Identifier for course domain
  JOB = 'job', // Identifier for job domain
  SCHOLARSHIP = 'scholarship', // Identifier for scholarship domain
  RETAIL = 'retail', // Identifier for retail domain
  BELEM = 'dsep-belem:courses', // Identifier for belem domain course
}

/**
 * Enum representing different actions that can be performed within the application.
 * Each action corresponds to a specific operation or event that the application can handle.
 */
export enum Action {
  search = 'search', // Trigger a search operation
  on_search = 'on_search', // Handle the result of a search operation
  select = 'select', // Trigger a select operation
  on_select = 'on_select', // Handle the result of a select operation
  init = 'init', // Initialize a process or component
  on_init = 'on_init', // Handle the initialization of a process or component
  confirm = 'confirm', // Confirm an action or process
  on_confirm = 'on_confirm', // Handle the confirmation of an action or process
  status = 'status', // Check the status of a process or component
  on_status = 'on_status', // Handle the status update of a process or component
  tracking = 'track', // Trigger a tracking operation
  on_tracking = 'on_track', // Handle the result of a tracking operation
  rating = 'rating', // Trigger a rating operation
  on_rating = 'on_rating', // Handle the result of a rating operation
  cancel = 'cancel', // Trigger a cancel operation
  on_cancel = 'on_cancel', // Handle the result of a cancel operation
  update = 'update', // Trigger an update operation
  on_update = 'on_update', // Handle the result of an update operation
  support = 'support', // Trigger a support operation
  on_support = 'on_support', // Handle the result of a support operation
}

/**
 * Enum representing the base URLs for different service gateways within the application.
 * Each gateway corresponds to a specific domain (job, course, scholarship) and is used
 * to route requests to the appropriate service.
 */
export enum Gateway {
  job = 'https://wo-ps-bap-client.onest.network', // Base URL for job-related services
  course = 'https://fs-ps-bap-client.onest.network', // Base URL for course-related services
  scholarship = 'https://fs-ps-bap-client.onest.network', // Base URL for scholarship-related services
  retail = 'https://staging.gateway.proteantech.in', // Base URL for retail-related services
  belem = 'https://gateway.becknprotocol.io/bg',
}
