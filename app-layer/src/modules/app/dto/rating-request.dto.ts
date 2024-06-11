import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

/**
 * Data Transfer Object (DTO) for the context of a search request.
 * Validates the context information required for a search operation.
 */
export class ContextDto {
  @IsNotEmpty({ message: 'Domain is required' })
  @IsString({ message: 'Domain must be a string' })
  domain: string;
  @IsNotEmpty({ message: 'Transaction ID is required' })
  @IsString({ message: 'Transaction ID must be a string' })
  transaction_id: string;

  @IsNotEmpty({ message: 'Message ID is required' })
  @IsString({ message: 'Message ID must be a string' })
  message_id: string;

  @IsNotEmpty({ message: 'TTL is required' })
  @IsString({ message: 'TTL must be a string' })
  ttl: string;
}
class OrderItem {
  @IsNotEmpty({ message: 'Order id is required' })
  @IsString({ message: 'Order id must be a string' })
  id: string;

  @IsArray()
  @IsString({ each: true })
  items_id: string[];

  @IsNotEmpty({ message: 'Provider id is required' })
  @IsString({ message: 'Provider id must be a string' })
  provider_id: string;

  @IsNotEmpty({ message: 'Rating category is required' })
  @IsString({ message: 'Rating category must be a string' })
  rating_category: string;

  @IsNotEmpty({ message: 'Value is required' })
  @IsString({ message: 'Value id must be a string' })
  @Matches(/^\d+$/, { message: 'Value must contain only numeric characters' })
  value: string;
}

class MessageDto {
  @ValidateNested()
  @Type(() => OrderItem)
  order: OrderItem;
}
/**
 * Data Transfer Object (DTO) for a search request.
 * Validates the search request information required for an init operation.
 */
export class RatingRequestDto {
  @IsNotEmpty({ message: 'Context is required' })
  @IsObject({ message: 'Context must be a object' })
  @ValidateNested()
  @Type(() => ContextDto)
  context: ContextDto;

  @IsNotEmpty({ message: 'Message is required' })
  @IsObject({ message: 'Message must be a object' })
  @ValidateNested()
  @Type(() => MessageDto)
  message: MessageDto;
}
