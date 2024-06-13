import { Module } from '@nestjs/common';
import { RetailService } from './services/retail.serviceV1';
import { RetailController } from './retail.controllerV1';

@Module({
  controllers: [RetailController],
  providers: [RetailService],
})
export class RetailModule {}
