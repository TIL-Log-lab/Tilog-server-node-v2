import { Injectable } from '@nestjs/common';
import { imageUpload } from '@prisma/client';

import { now } from '../../library/date';
import { PrismaConnection } from '../../library/prisma/type/prisma.type';

@Injectable()
export class FileUploadRepository {
  create({
    prismaConnection,
    userId,
    pathUrl,
    fileSizeBytes,
    fileType,
  }: {
    prismaConnection: PrismaConnection;
    userId: imageUpload['usersID'];
    pathUrl: imageUpload['pathUrl'];
    fileSizeBytes: imageUpload['fileSizeBytes'];
    fileType: imageUpload['fileType'];
  }) {
    return prismaConnection.imageUpload.create({
      data: {
        usersID: userId,
        pathUrl,
        fileSizeBytes,
        fileType,
        createdAt: now(),
      },
    });
  }
}
