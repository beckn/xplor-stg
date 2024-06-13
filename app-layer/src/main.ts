import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { json } from 'express';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  // Create a Nest application instance
  const app = await NestFactory.create(AppModule, { cors: true });

  // Use Helmet for basic security headers
  app.use(helmet());

  // Use global validation pipe with whitelist option enabled
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Set a global prefix for all routes, excluding the root and health check routes
  // Set global prefix for all routes
  app.setGlobalPrefix('app', { exclude: ['/', '/health', '/applicationForm'] });

  // Retrieve the ConfigService to access configuration values
  const configService = app.get(ConfigService);

  app.use(
    json({
      limit: '10mb',
    }),
  );
  // Enable Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // Start the application and listen on the configured port
  await app.listen(configService.get<string>('port'));
}
bootstrap();
