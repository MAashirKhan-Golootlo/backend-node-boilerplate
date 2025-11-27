import pino from 'pino';
import config from '../config';

const logger = pino({
  name: 'golootlo-backend',
  level: config.logLevel
});

export default logger;

