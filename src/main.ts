import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './module';
import { ResponseFormat, ResponseInterceptor } from './infrastructure/commons/interceptors/response.interceptor';
import { LoggingInterceptor } from './infrastructure/commons/interceptors/logger.interceptor';
import { LoggerService } from './infrastructure/libs/logger/logger.service';
import { AllExceptionFilter } from './infrastructure/commons/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV;

  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Clean Architecture Nestjs')
      .setDescription('Example with todo list')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT);
}
bootstrap();
