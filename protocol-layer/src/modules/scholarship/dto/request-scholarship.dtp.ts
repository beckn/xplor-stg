import { IsNotEmpty, IsOptional } from 'class-validator';
import { IScholarshipSelect } from '../interface/request/select';
import { ISelectContext } from '../interface/context';
import { IScholarshipInitMessage } from '../interface/request/init';
import { IScholarshipConfirmMessage } from '../interface/request/confirm';
import { ICourseStatusMessage } from '../../course/interface/request/confirm';

export class SelectScholarshipDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: IScholarshipSelect;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class InitScholarshipDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: IScholarshipInitMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnInitScholarshipDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: IScholarshipInitMessage;
}

export class ConfirmScholarshipDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: IScholarshipConfirmMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnConfirmScholarshipDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}

export class StatusScholarshipDto {
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

export class OnStatusScholarshipDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;
}
