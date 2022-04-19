import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/utils/';

export const postNotFound: ExceptionMessageInterface = {
  message: [
    { countryFlag: COUNTRY.ko, message: '포스트를 찾지 못했습니다' },
    { countryFlag: COUNTRY.en, message: 'Post not found' },
  ],
};

export const isPrivatePost: ExceptionMessageInterface = {
  message: [
    { countryFlag: COUNTRY.ko, message: '비밀글 입니다' },
    { countryFlag: COUNTRY.en, message: "It's a secret post" },
  ],
};
