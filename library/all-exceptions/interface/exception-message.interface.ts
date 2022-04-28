import { COUNTRY } from '@app/utils/';

export type ExceptionMessageInterface = Partial<
  Record<typeof COUNTRY[keyof typeof COUNTRY], string>
>;

// NOTE:  오브젝트 키 검사
export const isExceptionMessageInterface = (
  object: any,
): object is ExceptionMessageInterface => {
  if (!object) return false;
  if (!(object instanceof Object)) return false;

  return Object.keys(object).some((key) => key in COUNTRY);
};
