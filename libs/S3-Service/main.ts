
// import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';

// import { AppModule } from './app.module';
// import { ConfigService } from '../../libs/config/config.service';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   // ✅ SAFE CORS (Angular + backend server)
//   app.enableCors({
//     origin: [
//       'http://localhost:4200',
//       'https://opms.intercert.com',
//     ],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: [
//       'Content-Type',
//       'authorisation',
//       'ngrok-skip-browser-warning',
//     ],
//     credentials: true,
//   });

//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);

//   app.useGlobalPipes(
//     new ValidationPipe({
//       exceptionFactory: (validationErrors: ValidationError[] = []) => {
//         let msg = '';
//         for (const error of validationErrors) {
//             msg += `Invalid ${error.property} - ${Object.values(error.constraints).join(', ')}, `;
//         }
//         return new BadRequestException(msg);
//       },
//     }),
//   );

//   const config = new ConfigService();
//   config.loadFromEnv();
//   const port = config.get().servicePorts.auditorManagement || 8089;
//   await app.listen(port);
//   Logger.log(`🚀 Application is running on:->> http://localhost:${port}/${globalPrefix}`);
// }

// bootstrap();
