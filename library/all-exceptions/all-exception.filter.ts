import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { isExceptionMessageInterface } from '@app/library/';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const httpStatusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const customExceptionData = isHttpException
      ? exception.getResponse()
      : null;
    // NOTE: exception-message.interface를 상속받는 object인지 확인합니다
    const isCustomException = isExceptionMessageInterface(customExceptionData);

    // TODO: 커스텀 메시지 데이터가 존재하지 않을 경우 null을 리턴할지 undefined를 리턴할지 결정이 필요합니다
    // TODO: 정하고 나서는 모든 response 응답에 대해 통일해야합니다
    const responseBody = {
      statusCode: httpStatusCode,
      requestLocation: request.url,
      message: isCustomException ? customExceptionData.message : null,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatusCode);
  }
}
