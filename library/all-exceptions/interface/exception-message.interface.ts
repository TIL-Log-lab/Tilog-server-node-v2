import { COUNTRY } from '@app/utils/';

export interface ExceptionMessageInterface {
  message: ExceptionMessageItemInterface;
}
export type ExceptionMessageItemInterface = Partial<
  Record<typeof COUNTRY[keyof typeof COUNTRY], string>
>;

// NOTE:  오브젝트 키 검사
export const isExceptionMessageInterface = (
  object: any,
): object is ExceptionMessageInterface => {
  if (!object) return false;
  if (!(object instanceof Object)) return false;

  return Object.keys(object).some((key) => {
    if (!(key in COUNTRY)) return false;
    return true;
  });
};
