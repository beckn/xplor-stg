// Import necessary modules and services
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { GrafanaLoggerService } from '../services/grafana/service/grafana.service';
import configuration from '../config/env/env.config';
import { AxiosService } from './axios/axios.service';
import { LoggingInterceptor } from '../utils/logger-interceptor';

// Decorate the class with @Global() to make it a global module.
// This means that the providers and exports of this module will be available application-wide.
@Global()
@Module({
  imports: [
    // Configure the ConfigModule to be globally accessible throughout the application.
    // The configuration file is loaded to provide environment-specific settings.
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Import the HttpModule globally to make HTTP requests available throughout the application.
    { module: HttpModule, global: true },
  ],
  providers: [
    // Register the AxiosService as a provider, making it available for injection.
    AxiosService,
    // Register the GrafanaLoggerService as a provider, making it available for injection.
    GrafanaLoggerService,
    // Register a custom interceptor for logging purposes.
    // This interceptor will be used application-wide due to the @Global() decorator.
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  // Export the AxiosService and GrafanaLoggerService so they can be used in other modules.
  exports: [AxiosService, GrafanaLoggerService],
})
// Define the CommonModule class.
// This class is decorated with @Global(), making its providers and exports available application-wide.
export class CommonModule {}
