interface SuccessResponse<T> {
  code: string;
  message: string;
  data?: T | null;
}

interface ErrorResponse {
  code: string;
  message: string;
  data: null;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
