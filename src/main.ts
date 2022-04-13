import { NestFactory } from '@nestjs/core';
import { AppModule } from '@api/app.module';
import { swaggerDocumentBuilder } from '@app/library/open-api/';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const SERVER_PORT = configService.get<number>('SERVER_PORT', 3000);

  app.use(cookieParser());
  swaggerDocumentBuilder(app);

  await app.listen(SERVER_PORT);
}
bootstrap();
