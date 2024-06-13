import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { json } from 'express'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'

async function run() {
  const app = await NestFactory.create(AppModule, { cors: true })

  // Use Helmet for basic security headers
  app.use(helmet())

  // Use global validation pipe with whitelist option enabled
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // Set a global prefix for all routes, excluding the root and health check routes
  // Set global prefix for all routes
  app.setGlobalPrefix('onboarding', { exclude: ['/', '/health'] })
  app.use(
    json({
      limit: '10mb',
    }),
  )
  // Retrieve the ConfigService to access configuration values
  const configService = app.get(ConfigService)

  // Enable Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  // Start the application and listen on the configured port
  await app.listen(configService.get<string>('ONBOARDING_LAYER_PORT'))
}

run()
