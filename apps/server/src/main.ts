import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import parseErrorUtil from './commons/utils/parseErrorUtil';
import { instance as winstonInstance } from './lib/logger/winston.logger';

const PORT = process.env.PORT || 5001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonInstance,
    }),
  });
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN : '*',
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          errors: parseErrorUtil(errors),
          statusCode: 400,
        });
      },
    }),
  );
  await app.listen(PORT);
}
bootstrap();
