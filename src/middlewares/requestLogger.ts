import type { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import logger from '../core/logger';

const requestLogger: RequestHandler = (req, res, next) => {
  req.requestId = uuid();
  const start = Date.now();

  logger.info({ method: req.method, path: req.originalUrl, requestId: req.requestId }, 'Incoming request');

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      { statusCode: res.statusCode, duration, requestId: req.requestId },
      'Request completed'
    );
  });

  next();
};

export default requestLogger;

