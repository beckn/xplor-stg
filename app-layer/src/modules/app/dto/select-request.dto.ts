import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItem {
  @IsArray()
  @IsString({ each: true })
  items_id: string[];

  @IsOptional()
  provider_id: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fulfillment_id?: string[];
}

class Message {
  @ValidateNested()
  @Type(() => OrderItem)
  order: OrderItem;
}

class Context {
  @IsString()
  transaction_id: string;

  @IsString()
  domain: string;

  @IsString()
  message_id: string;

  @IsOptional()
  ttl: string;
}

export class SelectRequestDto {
  @ValidateNested()
  @Type(() => Context)
  context: Context;

  @ValidateNested()
  @Type(() => Message)
  message: Message;
}
