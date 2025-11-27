import type { RequestHandler } from 'express';

/**
 * Stub authentication middleware.
 * Replace with real auth logic (JWT, API keys, etc.) when needed.
 */
const auth: RequestHandler = (_req, _res, next) => {
  next();
};

export default auth;

