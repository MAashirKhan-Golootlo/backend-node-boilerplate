export type SuccessResponse<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
  requestId?: string;
};

export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    statusCode: number;
    details?: unknown;
  };
  requestId?: string;
};

export const successResponse = <T>(
  data: T,
  requestId?: string,
  meta?: Record<string, unknown>
): SuccessResponse<T> => ({
  success: true,
  data,
  meta,
  requestId
});

export const errorResponse = (
  message: string,
  statusCode: number,
  details?: unknown,
  requestId?: string
): ErrorResponse => ({
  success: false,
  error: {
    message,
    statusCode,
    details
  },
  requestId
});

