import 'reflect-metadata'; // <-- ADD THIS LINE
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 BePro API http://localhost:${port}`);
  console.log(`📘 Swagger  http://localhost:${port}/docs`);


  const url = process.env.DATABASE_URL || '';
try {
  const host = new URL(url).host;
  console.log('[DB] using host =', host); // e.g., ep-rough-base-a4q2gnel-pooler.us-east-1.aws.neon.tech
} catch {}

}
bootstrap();
