import { ExceptionMessageInterface } from '@app/library/all-exceptions';
import { COUNTRY } from '@app/library/constants';

export const awsFileUploadFail: ExceptionMessageInterface = {
  [COUNTRY.ko]: '파일을 업로드하는데 실패했습니다',
  [COUNTRY.en]: 'fileUpload is fail',
};

export const awsFileDeleteFail: ExceptionMessageInterface = {
  [COUNTRY.ko]: '파일을 삭제하는데 실패했습니다',
  [COUNTRY.en]: 'fileDelete is fail',
};
