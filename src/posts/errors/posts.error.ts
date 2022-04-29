import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/utils/';

export const postNotFound: ExceptionMessageInterface = {
  [COUNTRY.ko]: '포스트를 찾지 못했습니다',
  [COUNTRY.en]: 'Post not found',
};

export const isPrivatePost: ExceptionMessageInterface = {
  [COUNTRY.ko]: '비밀글 입니다',
  [COUNTRY.en]: "It's a secret post",
};
