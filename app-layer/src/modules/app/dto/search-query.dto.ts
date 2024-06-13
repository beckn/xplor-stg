import { IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  pageSize: string;

  @IsOptional()
  @IsString()
  pageNumber: string;
}
