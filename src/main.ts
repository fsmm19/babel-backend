import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { NotEmptyBodyPipe } from './common/pipes/not-empy-body.pipe';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { NormalizeNamesPipe } from './common/pipes/normalize-names.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new NotEmptyBodyPipe(),
    new NormalizeNamesPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
