import { IsNotEmpty, IsOptional } from 'class-validator';
import { Context } from '../interface/context';
import { IJobSelectMessage } from '../interface/request/select';

export class SearchJobDto {
  @IsNotEmpty()
  context: any;

  @IsNotEmpty()
  message: any;

  @IsOptional()
  gatewayUrl: string;
}

export class SelectJobDto {
  @IsNotEmpty()
  context: Context;

  @IsNotEmpty()
  message: IJobSelectMessage;

  @IsOptional()
  gatewayUrl: string;
}
