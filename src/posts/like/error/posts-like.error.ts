import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/utils/';

export const alreadySetLike: ExceptionMessageInterface = {
  message: [
    { countryFlag: COUNTRY.ko, message: '이미 설정되었습니다.' },
    { countryFlag: COUNTRY.en, message: 'already set up' },
  ],
};
