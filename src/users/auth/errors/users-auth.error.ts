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
    {
      countryFlag: COUNTRY.ko,
      message: '인증이 만료되었습니다 다시 로그인해주세요',
    },
    {
      countryFlag: COUNTRY.en,
      message: 'You dont have permission Please log in',
    },
  ],
};

export const deviceTypeInjectFail: ExceptionMessageInterface = {
  message: [
    {
      countryFlag: COUNTRY.ko,
      message: '유저 기기 정보를 가져오는데 실패했습니다',
    },
    {
      countryFlag: COUNTRY.en,
      message: 'Failed to get user device information',
    },
  ],
};
