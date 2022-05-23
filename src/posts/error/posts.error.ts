import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/library/constants';

export const postNotFound: ExceptionMessageInterface = {
  [COUNTRY.ko]: '포스트를 찾지 못했습니다',
  [COUNTRY.en]: 'Post not found',
};

export const isPrivatePost: ExceptionMessageInterface = {
  [COUNTRY.ko]: '비밀글 입니다',
  [COUNTRY.en]: "It's a secret post",
};

export const notPostYouOwn: ExceptionMessageInterface = {
  [COUNTRY.ko]: '본인이 소유한 게시글만 수정할 수 있습니다',
  [COUNTRY.en]: 'This is not a post you own',
};
