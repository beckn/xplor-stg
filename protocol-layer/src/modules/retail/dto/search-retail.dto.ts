import { IsNotEmpty, IsOptional } from 'class-validator';

export class SearchRetailDto {
  @IsNotEmpty()
  context: any;

  @IsNotEmpty()
  message: any;

  @IsOptional()
  gatewayUrl: string;
}
