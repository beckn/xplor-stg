// Import validation decorators from class-validator
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

// Define a Data Transfer Object (DTO) for logger payloads
export class LoggerPayloadDto {
  // The message property must not be empty
  @IsNotEmpty()
  message: any;

  // The methodName property is optional and must be a string if provided
  @IsOptional()
  @IsString()
  methodName?: string;
}
