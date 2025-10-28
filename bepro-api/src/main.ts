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
}
bootstrap();
