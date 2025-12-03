import {
  Catch,
  BadRequestException,
  HttpException,
  type ExceptionFilter,
  type ArgumentsHost,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import ApiResponse from './api.response';
import ResponseCode, { type ResponseCodeKey } from './api.response-code';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private handler = new GlobalExceptionHandler();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    let apiResponse: ApiResponse<null>;

    // Validation Error
    if (exception instanceof BadRequestException) {
      apiResponse = this.handler.handleValidationException(exception);
      reply.status(ResponseCode.VALIDATION_ERROR.status).send(apiResponse);
      return;
    }

    // CustomException
    if (exception instanceof CustomException) {
      apiResponse = this.handler.handleCustomException(exception);
      const status = ResponseCode[exception.responseCodeKey].status;
      reply.status(status).send(apiResponse);
      return;
    }

    // General exception
    apiResponse = this.handler.handleGeneralException(exception);
    reply.status(ResponseCode.INTERNAL_SERVER_ERROR.status).send(apiResponse);
  }
}

export class GlobalExceptionHandler {
  handleValidationException(exception: BadRequestException): ApiResponse<null> {
    const response: any = exception.getResponse();

    const messages: string[] = Array.isArray(response?.message)
      ? response.message
      : [response?.message];

    console.error('Validation failed:', messages);

    return ApiResponse.fail({
      code: ResponseCode.VALIDATION_ERROR.code,
      message: messages,
    });
  }

  handleCustomException(exception: CustomException): ApiResponse<null> {
    console.error(`Custom exception occurred: ${exception.responseCodeKey}`);
    return ApiResponse.fail(ResponseCode[exception.responseCodeKey]);
  }

  handleGeneralException(exception: unknown): ApiResponse<null> {
    console.error(`Unhandled exception occurred: ${exception}`);
    return ApiResponse.fail(ResponseCode.INTERNAL_SERVER_ERROR);
  }
}

export class CustomException extends HttpException {
  constructor(public readonly responseCodeKey: ResponseCodeKey) {
    const responseCode = ResponseCode[responseCodeKey];
    super(
      {
        code: responseCode.code,
        message: responseCode.message,
        data: null,
      },
      responseCode.status,
    );
  }
}
