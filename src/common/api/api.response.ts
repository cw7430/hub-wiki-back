import ResponseCode from './api.response-code';

export default class ApiResponse<T> {
  code: string;
  message: string | string[];
  data: T | null;

  private constructor(
    code: string,
    message: string | string[],
    data: T | null,
  ) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T | null): ApiResponse<T> {
    return new ApiResponse(
      ResponseCode.SUCCESS.code,
      ResponseCode.SUCCESS.message,
      data,
    );
  }

  static fail(responseCode: {
    code: string;
    message: string | string[];
  }): ApiResponse<null> {
    return new ApiResponse(responseCode.code, responseCode.message, null);
  }
}
