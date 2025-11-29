import {
  Catch,
  BadRequestException,
  HttpException,
  type ExceptionFilter,
  type ArgumentsHost,
} from '@nestjs/common';
import { type Response } from 'express';

import ApiResponse from './api.response';
import ResponseCode, { type ResponseCodeKey } from './api.response-code';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private handler = new GlobalExceptionHandler();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let apiResponse: ApiResponse<null>;

    // Validation Error
    if (exception instanceof BadRequestException) {
      apiResponse = this.handler.handleValidationException(exception);
      response.status(ResponseCode.VALIDATION_ERROR.status).json(apiResponse);
      return;
    }

    // CustomException
    if (exception instanceof CustomException) {
      apiResponse = this.handler.handleCustomException(exception);
      const status = ResponseCode[exception.responseCodeKey].status;
      response.status(status).json(apiResponse);
      return;
    }

    // General exception
    apiResponse = this.handler.handleGeneralException(exception);
    response
      .status(ResponseCode.INTERNAL_SERVER_ERROR.status)
      .json(apiResponse);
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

class CustomException extends HttpException {
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
