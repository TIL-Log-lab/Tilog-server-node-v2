import { Module } from '@nestjs/common';
import { PrismaService } from '@app/library/prisma';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
