import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/utils/';

export const alreadySetLike: ExceptionMessageInterface = {
  [COUNTRY.ko]: '이미 설정되었습니다.',
  [COUNTRY.en]: 'already set up',
};
