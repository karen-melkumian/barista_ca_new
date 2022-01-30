import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { JwtPayload } from 'jsonwebtoken'
import { BaseMiddleware } from 'inversify-express-utils';
import { TYPES } from '../../../container/types';
import { IJsonWebTokenUtils } from '../../../utils/jwt';

@injectable()
export class RefreshNeeded extends BaseMiddleware {
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
        if (!(req.body && req.body.refreshToken)) {
            return res.status(400).send({error: 'Refresh token missing'});
        }
        let b = Buffer.from(req.body.refreshToken, 'base64');
        let refreshToken = b.toString();
        let hash = this._jsonWebTokenUtils.hash(req.jwt.refreshKey, req.jwt.userId);
        if (hash === refreshToken) {
            delete req.jwt.iat;
            delete req.jwt.exp;
            req.body = req.jwt;
            return next();
        } else {
            return res.status(400).send({error: 'Invalid refresh token'});
        }
    }
}
