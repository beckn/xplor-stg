import { IsString, IsUrl, ArrayUnique, IsOptional, IsNotEmpty } from 'class-validator'

export class UpdateNetworkDto {
  @IsNotEmpty({ message: 'Network id is required' })
  @IsString({ message: 'Network id must be a string' })
  networkId: string

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name: string

  @IsOptional()
  @ArrayUnique({ message: 'Domains must be unique' })
  domains: string[]

  @IsOptional()
  @IsUrl({}, { message: 'BAP URL must be a valid URL' })
  bap_uri: string

  @IsOptional()
  @IsString({ message: 'BAP ID must be a string' })
  bap_id: string

  @IsOptional()
  @IsUrl({}, { message: 'Callback URL must be a valid URL' })
  callback_url: string

  @IsOptional()
  @IsUrl({}, { message: 'Registry URL must be a valid URL' })
  registry_url: string
}
