import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { imageUpload, users } from '@prisma/client';

import { now } from '@app/library/date';
import { FileManagerAwsS3Repository } from '@app/library/file-manager/aws-s3/file-manager-aws-s3.repository';
import { PrismaService } from '@app/library/prisma';

import { fileUploadFail } from './error/file-upload.error';
import { FileUploadRepository } from './file-upload.repository';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileManager: FileManagerAwsS3Repository,
    private readonly prismaService: PrismaService,
    private readonly fileUploadRepository: FileUploadRepository,
  ) {}

  private generateFileNameByUserId(userId: number) {
    return `${userId}${Math.random().toString(36).substring(2, 15)}${now()}`;
  }

  private getFileExtensionFromMimeType(mimeType: string) {
    return `${mimeType.split('/')[1] ?? ''}`;
  }

  async upload({
    userId,
    fileRaw,
    mimeType,
    fileSizeBytes,
  }: {
    userId: users['id'];
    fileRaw: Buffer;
    mimeType: string;
    fileSizeBytes: imageUpload['fileSizeBytes'];
  }) {
    try {
      return await this.prismaService.$transaction(async (prisma) => {
        const fileExtension = this.getFileExtensionFromMimeType(mimeType);
        const fileName = this.generateFileNameByUserId(userId);

        // NOTE: 파일 업로드
        const fileUploadResult = await this.fileManager.save({
          fileName: `${fileName}.${fileExtension}`,
          fileRaw,
          mimeType,
        });

        // NOTE: 파일 업로드 데이터베이스 저장
        return this.fileUploadRepository.create({
          prismaConnection: prisma,
          userId,
          pathUrl: fileUploadResult.location,
          fileSizeBytes,
          fileType: fileExtension,
        });
      });
    } catch (_) {
      throw new InternalServerErrorException(fileUploadFail);
    }
  }
}
