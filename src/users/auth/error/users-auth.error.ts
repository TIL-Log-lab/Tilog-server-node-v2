import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/library/constants';

export const decodeRefreshTokenFail: ExceptionMessageInterface = {
  [COUNTRY.ko]: '리프레시 토큰 인증에 실패했습니다.',
  [COUNTRY.en]: 'Decode RefreshToken Fail',
};

export const decodeAccessTokenFail: ExceptionMessageInterface = {
  [COUNTRY.ko]: '액세스 토큰 인증에 실패했습니다.',
  [COUNTRY.en]: 'Decode AccessToken Fail',
};

export const hasNotRefreshToken: ExceptionMessageInterface = {
  [COUNTRY.ko]: '인증이 만료되었습니다 다시 로그인해주세요',
  [COUNTRY.en]: 'You dont have permission Please log in',
};

export const deviceTypeInjectFail: ExceptionMessageInterface = {
  [COUNTRY.ko]: '유저 기기 정보를 가져오는데 실패했습니다',
  [COUNTRY.en]: 'Failed to get user device information',
};

export const unauthorizedUser: ExceptionMessageInterface = {
  [COUNTRY.ko]: '로그인된 유저만 접근할 수 있습니다',
  [COUNTRY.en]: 'You dont have permission Please log in',
};
