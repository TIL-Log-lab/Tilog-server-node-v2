import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import AWS from 'aws-sdk';

import {
  awsFileUploadFail,
  awsFileDeleteFail,
} from '@app/library/file-manager/aws-s3/error/aws-s3.error';

import { FileManagerRepository } from '../interface/file-manager.interface';

@Injectable()
export class FileManagerAwsS3Repository implements FileManagerRepository {
  private readonly S3_BUCKET_NAME: string;

  private readonly S3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.S3_BUCKET_NAME = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');

    const accessKeyId =
      this.configService.getOrThrow<string>('AWS_S3_ACCESS_KEY');
    const secretAccessKey =
      this.configService.getOrThrow<string>('AWS_S3_KEY_SECRET');
    this.S3 = new AWS.S3({ accessKeyId, secretAccessKey });
  }

  async save({
    fileName,
    fileRaw,
    mimeType,
  }: {
    fileName: string;
    fileRaw: Buffer;
    mimeType: string;
  }) {
    try {
      const fileUploadResult = await this.S3.upload({
        Bucket: this.S3_BUCKET_NAME,
        Key: fileName,
        Body: fileRaw,
        ACL: 'public-read',
        ContentType: mimeType,
        ContentDisposition: 'inline',
      }).promise();

      return {
        name: fileUploadResult.Key,
        location: fileUploadResult.Location,
      };
    } catch (error) {
      throw new BadGatewayException(awsFileUploadFail);
    }
  }

  async delete({ fileName }: { fileName: string }) {
    try {
      await this.S3.deleteObject({
        Bucket: this.S3_BUCKET_NAME,
        Key: fileName,
      }).promise();

      return { name: fileName };
    } catch (error) {
      throw new BadGatewayException(awsFileDeleteFail);
    }
  }
}
