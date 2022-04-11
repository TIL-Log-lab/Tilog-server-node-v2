import { GetCodeResponseDto } from '@api/example/code/dto/get-code.dto';
import { applyDecorators, Get } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

export const GetCode = () =>
  applyDecorators(
    Get(),
    ApiCreatedResponse({
      description: '테스트 입니다.',
      type: GetCodeResponseDto,
    }),
  );
