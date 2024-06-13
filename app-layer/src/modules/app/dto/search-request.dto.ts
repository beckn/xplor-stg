import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) for the context of a search request.
 * Validates the context information required for a search operation.
 */
export class ContextDto {
  @IsNotEmpty({ message: 'Domain is required' })
  @IsString({ message: 'Domain must be a string' })
  domain: string;

  @IsNotEmpty({ message: 'Action is required' })
  @IsString({ message: 'Action must be a string' })
  action: string;

  @IsNotEmpty({ message: 'Version is required' })
  @IsString({ message: 'Version must be a string' })
  version: string;

  @IsNotEmpty({ message: 'BAP ID is required' })
  @IsString({ message: 'BAP ID must be a string' })
  bap_id: string;

  @IsNotEmpty({ message: 'BAP URI is required' })
  @IsString({ message: 'BAP URI must be a string' })
  bap_uri: string;

  @IsNotEmpty({ message: 'Transaction ID is required' })
  @IsString({ message: 'Transaction ID must be a string' })
  transaction_id: string;

  @IsNotEmpty({ message: 'Message ID is required' })
  @IsString({ message: 'Message ID must be a string' })
  message_id: string;

  @IsNotEmpty({ message: 'Timestamp is required' })
  @IsString({ message: 'Timestamp must be a string' })
  timestamp: string;

  @IsNotEmpty({ message: 'TTL is required' })
  @IsString({ message: 'TTL must be a string' })
  ttl: string;
}

/**
 * Data Transfer Object (DTO) for a message within a search request.
 * Validates the message information required for a search operation.
 */
export class MessageDto {
  intent: {
    item: {
      descriptor: {
        name: string;
      };
    };
  };
}

/**
 * Data Transfer Object (DTO) for a search request.
 * Validates the search request information required for a search operation.
 */
export class SearchRequestDto {
  @IsNotEmpty({ message: 'Domain should not be empty' })
  @IsArray({ message: ' Domain must be string' })
  domain: Array<string>;

  @IsNotEmpty({ message: 'Context is required' })
  @IsObject({ message: 'Context must be a object' })
  context: ContextDto;

  @IsNotEmpty({ message: 'Message is required' })
  @IsObject({ message: 'Message must be a object' })
  message: MessageDto;
}
