import { Body, Controller, Post } from '@nestjs/common';
import { RetailService } from './services/retail.serviceV1';
import { SearchRetailDto } from './dto/search-retail.dto';
@Controller({ version: '1', path: 'retail' })
export class RetailController {
  constructor(private readonly retailService: RetailService) {}

  @Post('search')
  search(@Body() searchRetailDto: SearchRetailDto) {
    return this.retailService.search(searchRetailDto);
  }

  @Post('on_search')
  onSearch(@Body() searchRetailDto: SearchRetailDto) {
    this.retailService.onSearch(searchRetailDto);
  }
}
