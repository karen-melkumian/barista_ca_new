import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class ExtractUserId extends BaseMiddleware {
    constructor() {
        super();
    }

    public handler(
        req: Request,
        res: Response,
        next: NextFunction,
    ): void {
        req.body.id = req.params.userId;
        next();
    }
}
