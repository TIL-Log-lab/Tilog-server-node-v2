import { COUNTRY } from '@app/utils/';

// NOTE: message 유무, message 원소 내부 countryFlag 유무 검증 후 반환
export const isExceptionMessageInterface = (
  object: any,
): object is ExceptionMessageInterface => {
  const hadMessage = object ? 'message' in object : false;
  const hadCountryFlag = object?.message[0]?.countryFlag;
  return !!(hadMessage && hadCountryFlag);
};
export interface ExceptionMessageInterface {
  message: [ExceptionMessageItemInterface];
}
interface ExceptionMessageItemInterface {
  countryFlag: typeof COUNTRY[keyof typeof COUNTRY];
  message: string;
}
