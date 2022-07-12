import {
  HttpStatus,
  Injectable,
  ParseFilePipeBuilder,
  UploadedFile,
} from '@nestjs/common';

import { FileUploadService } from './file-upload.service';
import { JwtUserId } from '@app/library/decorators/jwt-user-Id.decorator';
import { Express } from 'express';

import { TokenPayload } from '@app/library/jwt/type/token.type';

import { ImageFileUpload } from './file-upload.decorator';

@Injectable()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ImageFileUpload()
  uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
        })
        .addMaxSizeValidator({
          maxSize: 1500,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @JwtUserId() { userId }: TokenPayload,
  ) {
    return null;
  }
}
