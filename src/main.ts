import { NestFactory } from '@nestjs/core';
import { AppModule } from '@api/app.module';
import { swaggerDocumentBuilder } from '@app/library/open-api/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerDocumentBuilder(app);
  await app.listen(3000);
}
bootstrap();
