import { Module } from '@nestjs/common';
import { ExampleCodeController } from '@api/example/code/example-code.controller';
import { ExampleCodeService } from '@api/example/code/example-code.service';
import { PrismaModule } from '@app/library/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ExampleCodeController],
  providers: [ExampleCodeService],
  exports: [ExampleCodeService],
})
export class ExampleModule {}
