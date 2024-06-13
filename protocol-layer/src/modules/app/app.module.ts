// Import necessary modules and services
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Import necessary controllers and services
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import configuration and other modules
import configuration from '../../config/env/env.config';
import { JobModule } from '../job/job.module';
import { ScholarshipModule } from '../scholarship/scholarship.module';
import { CourseModule } from '../course/course.module';
import { RetailModule } from '../retail/retail.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    // Configure the ConfigModule to be globally accessible throughout the application.
    // The configuration file is loaded to provide environment-specific settings.
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Import the CommonModule, which may contain global providers and exports
    CommonModule,
    // Import the CourseModule, which may contain its own controllers, providers, and exports
    CourseModule,
    // Import the JobModule, which may contain its own controllers, providers, and exports
    JobModule,
    // Import the ScholarshipModule, which may contain its own controllers, providers, and exports
    ScholarshipModule,
    // Import the RetailModule, which may contain its own controllers, providers, and exports
    RetailModule,
  ],
  // Register the AppController to handle requests
  controllers: [AppController],
  // Register the AppService as a provider, making it available for injection
  providers: [AppService],
})
// Define the AppModule class
export class AppModule {}
