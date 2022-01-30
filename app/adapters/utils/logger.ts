import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import { configApp } from '../config/config';

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!('true' === configApp.environment)) {
    loggerOptions.meta = false;
}

export const logger = expressWinston.logger(loggerOptions);
