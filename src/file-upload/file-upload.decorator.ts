import { applyDecorators, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/library/guards/auth/jwt-access-token.guard';

import { UploadImageResponseDto } from './dto/upload-image.dto';

export const ImageFileUpload = () =>
  applyDecorators(
    Post('file/image'),
    UseInterceptors(FileInterceptor('file')),
    JwtAccessTokenGuard(),
    ApiTags('File Upload'),
    ApiOperation({
      summary: '이미지를 업로드 합니다.',
    }),
    ApiOkResponse({
      description: '파일 업로드 성공',
      type: UploadImageResponseDto,
    }),
  );
