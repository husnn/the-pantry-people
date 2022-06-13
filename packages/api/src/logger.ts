import * as appRoot from 'app-root-path';
import * as winston from 'winston';

let packageName = process.env.npm_package_name;

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
  winston.format.printf((info) => {
    return JSON.stringify({
      timestamp: info.timestamp,
      ...(packageName && { app: packageName }),
      level: info.level,
      message: info.message
    });
  })
);

const consoleLogFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `[${info.level}] ${info.message}`)
);

export const setupLogger = (package_: string) => (packageName = package_);

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: 'error',
      format: logFormat,
      maxsize: 5242880,
      handleExceptions: true
    }),
    new winston.transports.File({
      filename: `${appRoot}/logs/info.log`,
      level: 'info',
      format: logFormat,
      maxsize: 5242880
    }),
    new winston.transports.Console({
      level: 'debug',
      format: consoleLogFormat,
      handleExceptions: true
    })
  ],
  exitOnError: false
});

export default logger;
