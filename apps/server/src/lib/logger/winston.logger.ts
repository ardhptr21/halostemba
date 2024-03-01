import { LoggerOptions, createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_PROD_LOCATION = process.env.LOG_PROD_LOCATION || 'logs';

type Loggers = {
  [key: string]: LoggerOptions;
};

const loggers: Loggers = {
  development: {
    transports: [new transports.Console({ level: LOG_LEVEL })],
    format: format.combine(format.colorize(), format.simple()),
  },
  production: {
    transports: [
      new DailyRotateFile({
        filename: 'api-combined-%DATE%.log',
        dirname: LOG_PROD_LOCATION,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '500m',
        maxFiles: '14d',
        level: LOG_LEVEL,
        format: format.combine(
          format.uncolorize(),
          format.timestamp(),
          format.json(),
        ),
      }),
      new DailyRotateFile({
        filename: 'api-error-%DATE%.log',
        dirname: LOG_PROD_LOCATION,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '500m',
        maxFiles: '14d',
        level: 'error',
        format: format.combine(
          format.uncolorize(),
          format.timestamp(),
          format.errors({ stack: true }),
          format.json(),
        ),
      }),
    ],
  },
};

export const instance = createLogger(
  loggers[process.env.NODE_ENV || 'development'] || loggers.development,
);
