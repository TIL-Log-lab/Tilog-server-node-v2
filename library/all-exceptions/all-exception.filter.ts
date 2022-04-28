import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { isExceptionMessageInterface } from '@app/library/all-exceptions';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    // NOTE: HttpException이 아니면 500코드를 할당한다
    const isHttpException = exception instanceof HttpException;
    const httpStatusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    // NOTE: HttpException일 경우에만 에러 메시지를 가져온다
    const customExceptionData = isHttpException
      ? exception.getResponse()
      : null;
    // NOTE: exception-message.interface를 상속받는 object인지 확인한다
    const isCustomException = isExceptionMessageInterface(customExceptionData);
    console.log(isCustomException);

    // TODO: 500 및 에러 핸들링 되지 않은 모든 에러 메시지를 모니터링한다 추후 APM 연동 필요
    if (
      httpStatusCode === HttpStatus.INTERNAL_SERVER_ERROR ||
      !isCustomException
    )
      Logger.error(exception);

    const responseBody = {
      statusCode: httpStatusCode,
      requestLocation: request.url,
      message: isCustomException ? customExceptionData : undefined,
    };
    console.log(customExceptionData);
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatusCode);
  }
}
