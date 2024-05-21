// Import validation decorators from class-validator
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ISelectContext } from '../../scholarship/interface/context';
import { IOnSelectMessage } from '../../scholarship/interface/response/on-select';
import { ICourseSelectMessage } from '../interface/request/select';
import { ICourseInitMessage } from '../interface/request/init';
import { ICourseConfirmMessage } from '../interface/request/confirm';

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
  message: ICourseInitMessage;

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

