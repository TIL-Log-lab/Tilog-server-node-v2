import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/utils/';

export const decodeRefreshTokenFail: ExceptionMessageInterface = {
  message: [
    { countryFlag: COUNTRY.ko, message: '리프레시 토큰 인증에 실패했습니다.' },
    { countryFlag: COUNTRY.en, message: 'Decode RefreshToken Fail' },
  ],
};

export const hasNotRefreshToken: ExceptionMessageInterface = {
  message: [
    { countryFlag: COUNTRY.ko, message: '권한이 없습니다 로그인해주세요' },
    {
      countryFlag: COUNTRY.en,
      message: 'You dont have permission Please log in',
    },
  ],
};
