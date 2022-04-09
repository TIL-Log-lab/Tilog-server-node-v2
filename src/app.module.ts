import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppService } from '@api/app.service';
import { AppController } from '@api/app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
