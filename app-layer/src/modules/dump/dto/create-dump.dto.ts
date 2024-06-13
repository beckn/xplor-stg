import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateDumpDto {
  @IsString()
  @IsNotEmpty()
  transaction_id: string;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsString()
  @IsNotEmpty()
  provider_id: string;

  @IsObject()
  @IsNotEmpty()
  context: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  message: Record<string, any>;

  constructor(partial: Partial<CreateDumpDto>) {
    Object.assign(this, partial);
  }
}
