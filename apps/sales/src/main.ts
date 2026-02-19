import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '../../../libs/config/config.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Load environment configuration
  const config = new ConfigService();
  config.loadFromEnv();

  // const corsOrigins = (process.env.CORS_ORIGINS || '').split(',');

  // app.enableCors({
  //   origin: corsOrigins.length > 0 ? corsOrigins : true, // Default to true if no CORS_ORIGINS are defined
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   allowedHeaders: ['Content-Type', 'authorisation', 'ngrok-skip-browser-warning'],
  //   credentials: true,
  // });


   const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : [];

  console.log('CORS Origins Inside Master Management Module:', corsOrigins);
  
  // NEW:
  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser requests (Postman, server-to-server)
      if (!origin) return callback(null, true);

      // If no origins defined in .env, allow all (useful for local development)
      if (corsOrigins.length === 0) {
        return callback(null, true);
      }

      if (corsOrigins.includes(origin) || origin.startsWith('http://localhost')) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'authorization',
      'authorisation',
      'Accept',
      'accesstoken',
      'ngrok-skip-browser-warning',
    ],
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        let msg = '';
        for (const error of validationErrors) {
          msg += `Invalid ${error.property} - ${Object.values(
            error.constraints || {},
          ).join(', ')}, `;
        }
        return new BadRequestException(msg.trim());
      },
    }),
  );

  const port = parseInt(process.env.SALES_MANAGEMENT_PORT || '8095', 10);
  await app.listen(port);

  // Log application status
  Logger.log(`🚀 Application is running at http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
