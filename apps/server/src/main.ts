import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const result = errors.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.property]: curr.constraints[Object.keys(curr.constraints)[0]],
          }),
          {},
        );
        return new BadRequestException({
          errors: result,
          statusCode: 400,
        });
      },
    }),
  );
  await app.listen(5001);
}
bootstrap();
