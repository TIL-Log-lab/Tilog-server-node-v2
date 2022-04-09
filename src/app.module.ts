import { Module } from '@nestjs/common';
import { AppService } from '@api/app.service';
import { AppController } from '@api/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
