import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const numeric = (value: string | undefined, fallback: number): number => {
  const parsed = value ? Number(value) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
};

const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: numeric(process.env.PORT, 4000),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  apiPrefix: process.env.API_PREFIX ?? '/api/v1'
};

export type AppConfig = typeof config;

export default config;

