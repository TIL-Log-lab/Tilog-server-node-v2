import {
  HttpStatus,
  Injectable,
  ParseFilePipeBuilder,
  UnauthorizedException,
  UploadedFile,
} from '@nestjs/common';

import { FileUploadService } from './file-upload.service';
import { JwtUserId } from '@app/library/decorators/jwt-user-Id.decorator';
import { Express } from 'express';

import { decodeAccessTokenFail } from '@api/users/auth/error/users-auth.error';
import { TokenPayload } from '@app/library/jwt/type/token.type';

import { UploadImageResponseDto } from './dto/upload-image.dto';
import { ImageFileUpload } from './file-upload.decorator';

@Injectable()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ImageFileUpload()
  async uploadImage(
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
    if (!userId) throw new UnauthorizedException(decodeAccessTokenFail);

    const result = await this.fileUploadService.upload({
      userId,
      fileRaw: file.buffer,
      mimeType: file.mimetype,
      fileSizeBytes: file.size,
    });
    return new UploadImageResponseDto({ path: result.pathUrl });
  }
}
