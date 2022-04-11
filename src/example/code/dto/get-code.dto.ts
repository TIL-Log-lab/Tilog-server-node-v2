import { IsNotEmpty, IsNumber } from 'class-validator';
import { users } from '@prisma/client';
import { Transform, Type } from 'class-transformer';

export class GetCodeRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  // NOTE: 데이터 베이스에 관련된 타입은 모두 prisma/client에서 로드해서 사용합니다
  readonly userId: users['id'];
}

export class GetCodeResponseDto {
  readonly message: string;

  constructor(required: Required<GetCodeResponseDto>) {
    Object.assign(this, required);
  }
}
