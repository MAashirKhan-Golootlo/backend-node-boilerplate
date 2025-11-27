import type { ErrorRequestHandler, RequestHandler } from 'express';
import HttpError from '../core/httpError';
import logger from '../core/logger';
import { errorResponse } from '../utils/response';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const httpError = err instanceof HttpError ? err : new HttpError(500, err.message || 'Internal Server Error');
  const statusCode = httpError.statusCode;

  logger.error(
    {
      err,
      requestId: req.requestId
    },
    'Request failed'
  );

  return res.status(statusCode).json(errorResponse(httpError.message, statusCode, httpError.details, req.requestId));
};

