import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class FildsAuth extends BaseMiddleware {
    constructor() {
        super();
    }

    public handler(
        req: Request,
        res: Response,
        next: NextFunction,
    ): void | Response {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            return res.status(400).send({error: 'Missing body fields: email, password'});
        }
    }
}
