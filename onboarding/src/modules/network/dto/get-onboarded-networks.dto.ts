import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class GetOnboardedNetworksDto {
  @ApiProperty({ description: 'The search query', example: '10th result' })
  @IsOptional()
  @IsString({ message: 'searchQuery must be a string' })
  searchQuery?: string

  @ApiProperty({ description: 'The page number', example: 1 })
  page: number

  @ApiProperty({ description: 'The size of the page', example: 20 })
  pageSize: number

  constructor(searchQuery?: string, page: number = 1, pageSize: number = 20) {
    this.searchQuery = searchQuery
    this.page = page
    this.pageSize = pageSize
  }
}
