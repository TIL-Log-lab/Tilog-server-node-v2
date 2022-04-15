import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Tilog-v2')
  .setDescription('Tilog-Backend')
  .setVersion('2.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'Authorization',
      in: 'header',
    },
    'accessToken',
  )
  .build();

export const swaggerDocumentBuilder = (app: INestApplication): void => {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
