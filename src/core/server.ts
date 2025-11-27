import http from 'http';
import app from './app';
import config from '../config';
import logger from './logger';

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info(`🚀 API listening on http://localhost:${config.port}${config.apiPrefix}`);
  logger.info(`📄 Swagger UI available at http://localhost:${config.port}/api-docs`);
});

const shutdown = (signal: NodeJS.Signals) => {
  logger.info({ signal }, 'Received shutdown signal, closing server...');
  server.close(() => {
    logger.info('HTTP server closed. Bye!');
    process.exit(0);
  });
};

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, () => shutdown(signal));
});

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'Unhandled promise rejection');
});

export default server;

