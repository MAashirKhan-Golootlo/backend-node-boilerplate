import 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
      PORT?: string;
      LOG_LEVEL?: string;
      API_PREFIX?: string;
    }
  }
}

export {};

