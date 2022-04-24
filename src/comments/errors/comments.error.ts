import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/utils/';

export const commentNotFound: ExceptionMessageInterface = {
  message: [
    {
      countryFlag: COUNTRY.ko,
      message: '존재하지 않는 댓글입니다.',
    },
    {
      countryFlag: COUNTRY.en,
      message: 'not found comment',
    },
  ],
};
