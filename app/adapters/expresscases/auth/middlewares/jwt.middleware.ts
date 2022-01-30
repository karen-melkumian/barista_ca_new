import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { JwtPayload } from 'jsonwebtoken'
import { BaseMiddleware } from 'inversify-express-utils';
import { TYPES } from '../../../container/types';
import { IJsonWebTokenUtils } from '../../../utils/jwt';

@injectable()
export class JWTNeeded extends BaseMiddleware {
    constructor(
        @inject(TYPES.JsonWebTokenUtils)
        private readonly _jsonWebTokenUtils: IJsonWebTokenUtils,
    ) {
        super();
    }

    public handler(
        req: Request & JwtPayload,
        res: Response,
        next: NextFunction,
    ): void | Response {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    req.jwt = this._jsonWebTokenUtils.decode(authorization[1]);
                    next();
                }
            } catch (err) {
                return res.status(403).send('Invalid token');
            }
        } else {
            return res.status(401).send('You must provide an `Authorization` header');
        }
    }
}
