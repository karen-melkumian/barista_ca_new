import * as express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import { configApp } from '../config/config';
import { DbClient, getDatabaseClient } from "../utils/mongoose_client";
import { TYPES } from "../container/types";
import { logger } from '../utils/logger';

export async function server(container: Container) {

    if (container.isBound(TYPES.App) === false) {

        const mongooseClient = await getDatabaseClient(configApp.mongodbConnect);
        container.bind<DbClient>(TYPES.MongooseClient).toConstantValue(mongooseClient);

        // Configure express server
        const server = new InversifyExpressServer(container);

        server.setConfig((app) => {
            app.use(bodyParser.urlencoded({extended: true}));
            app.use(bodyParser.json());
            app.use(logger);
        
            app.use(function (req, res, next) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
                if (req.method === 'OPTIONS') {
                    return res.status(200).send();
                } else {
                    return next();
                }
            });
        });

        server.setErrorConfig((app) => {
        });

        const app = server.build();

        // Run express server
        console.log(`Application listening on port ${configApp.serverPort}...`);
        app.listen(configApp.serverPort);

        container.bind<express.Application>(TYPES.App).toConstantValue(app);

        return app;
    } else {
        return container.get<express.Application>(TYPES.App);
    }
}
