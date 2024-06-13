import { IsNotEmpty, IsOptional } from 'class-validator';

export class SearchScholarshipDto {
  @IsNotEmpty()
  context: any;

  @IsNotEmpty()
  message: any;

  @IsOptional()
  gatewayUrl: string;
}
