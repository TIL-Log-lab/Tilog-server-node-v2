import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@app/library/prisma';

// @Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
