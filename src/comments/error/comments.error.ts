import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/library/constants';

export const commentNotFound: ExceptionMessageInterface = {
  [COUNTRY.ko]: '존재하지 않는 댓글입니다.',
  [COUNTRY.en]: 'not found comment',
};

export const unauthorizedComment: ExceptionMessageInterface = {
  [COUNTRY.ko]: '수정 권한이 없는 댓글입니다.',
  [COUNTRY.en]: `This is a comment you don't have permission to edit.`,
};

export const replyToCommentNotFound: ExceptionMessageInterface = {
  [COUNTRY.ko]: '존재하지 않는 댓글에는 답글을 달 수 없습니다.',
  [COUNTRY.en]: 'You cannot reply to comments that do not exist.',
};
