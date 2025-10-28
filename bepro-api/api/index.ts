// /api/index.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedApp: any;

async function bootstrap() {
  if (cachedApp) return cachedApp;
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('BePro API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  await app.init(); // IMPORTANT: no app.listen() on Vercel
  cachedApp = app;
  return app;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
}
