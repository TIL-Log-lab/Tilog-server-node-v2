import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@api/app.module';
import { swaggerDocumentBuilder } from '@app/library/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const origin: string[] = configService
    .get<string>('CORS_ORIGIN', '*')
    .split(',');
  const methods: string[] = configService
    .get<string>('CORS_METHOD', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    .split(',');
  app.enableCors({ origin, methods });

  app.use(cookieParser());
  swaggerDocumentBuilder(app);

  const SERVER_PORT = configService.get<number>('SERVER_PORT', 3000);
  await app.listen(SERVER_PORT);
}
bootstrap();
