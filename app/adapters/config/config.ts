import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import config from 'config';
import { IConfigApp } from './config.interface'

export const configApp: IConfigApp = {
    serverPort: config.get('server_port') as number,
    jwtSecret: config.get('jwt_secret') as string,
    environment: config.has('environment')
        ? config.get('environment') as string
        : 'false',
    mongodbConnect: config.get('mongodb_connect') as string,
}
