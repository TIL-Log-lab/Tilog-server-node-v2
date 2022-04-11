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

    const isHttpException = exception instanceof HttpException;
    const httpStatusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const customExceptionData = isHttpException
      ? exception.getResponse()
      : null;
    // NOTE: exception-message.interface를 상속받는 object인지 확인합니다
    const isCustomException = isExceptionMessageInterface(customExceptionData);

    // TODO: 개발 참고용, 배포시 제외
    Logger.error(isHttpException ? exception.getResponse() : exception);

    const responseBody = {
      statusCode: httpStatusCode,
      requestLocation: request.url,
      message: isCustomException ? customExceptionData.message : undefined,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatusCode);
  }
}
