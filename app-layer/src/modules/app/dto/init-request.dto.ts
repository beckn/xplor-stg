import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
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

class BillingDto {
  @IsNotEmpty({ message: 'Billing id is required' })
  @IsString({ message: 'Billing id i must be a string' })
  id: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;
}

class PersonDto {
  @IsNotEmpty({ message: 'Person Name is required' })
  @IsString({ message: 'Person Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Person Gender is required' })
  @IsString({ message: 'Person Gender must be a string' })
  gender: string;

  @IsNotEmpty({ message: 'Person Age is required' })
  @IsString({ message: 'Person Age must be a string' })
  age: string;
}

class ContactDto {
  @IsNotEmpty({ message: 'Contact Phone is required' })
  @IsString({ message: 'Contact Phone must be a string' })
  phone: string;

  @IsNotEmpty({ message: 'Contact Email is required' })
  @IsString({ message: 'Contact Email must be a string' })
  email: string;
}
class CustomerDto {
  @ValidateNested()
  @Type(() => PersonDto)
  person: PersonDto;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
}
class FulfillmentDto {
  @IsNotEmpty({ message: 'Fulfillment id is required' })
  @IsString({ message: 'Fulfillment id must be a string' })
  id: string;

  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;
}

export class FulfillmentsDto {
  @ArrayNotEmpty({ message: 'Fulfillments cannot be empty' })
  @ValidateNested({ each: true })
  // @Type(() => FulfillmentDto)
  fulfillment: any;
}
class OrderItem {
  @ValidateNested()
  @Type(() => BillingDto)
  @IsNotEmpty({ message: 'Billing is required' })
  billing: BillingDto;

  @IsArray()
  @IsNotEmpty({ message: 'items_id id is required' })
  items_id: string[];

  @IsString()
  @IsNotEmpty({ message: 'Provider id is required' })
  provider_id: string;

  @ValidateNested()
  @Type(() => FulfillmentDto)
  @IsNotEmpty({ message: 'Fulfillment is required' })
  fulfillment: FulfillmentDto;
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
export class InitRequestDto {
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
