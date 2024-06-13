import { Controller, Get } from '@nestjs/common'
import { IHealthCheck } from './app.interface'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): IHealthCheck {
    return this.appService.getHealthCheck()
  }

  getHello(): string {
    return 'Hello!'
  }
}
