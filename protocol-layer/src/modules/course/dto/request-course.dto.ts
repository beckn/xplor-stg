// Import validation decorators from class-validator
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ISelectContext } from '../../scholarship/interface/context';
import { IOnSelectMessage } from '../../scholarship/interface/response/on-select';
import { ICourseSelectMessage } from '../interface/request/select';
import { ICourseInitMessage } from '../interface/request/init';
import {
  ICourseConfirmMessage,
  ICourseStatusMessage,
} from '../interface/request/confirm';
import { ICourseTrackMessage } from '../interface/request/tracking';
import { ICourseRatingMessage } from '../interface/request/rating';
import { ICourseCancelMessage } from '../interface/request/cancel';
import { ICourseUpdateMessage } from '../interface/request/update';
import { ICourseSupportMessage } from '../interface/request/support';

// Define a Data Transfer Object (DTO) for search course payloads
export class SearchCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: any;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class SelectCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseSelectMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnSelectCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: IOnSelectMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class InitCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseInitMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnInitCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class ConfirmCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseConfirmMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnConfirmCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}

export class StatusCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseStatusMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnStatusCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}

export class TrackingCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseTrackMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}
export class OnTrackingCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}

export class RatingCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseRatingMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnRatingCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}

export class CancelCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseCancelMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnCancelCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}

export class UpdateCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseUpdateMessage;
}

export class OnUpdateCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}

export class SupportCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseSupportMessage;
}

export class OnSupportCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}
