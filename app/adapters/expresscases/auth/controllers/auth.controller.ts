import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPES } from '../../../container/types';
import { IJsonWebTokenUtils, IJWT } from '../../../utils/jwt';

@controller('/auth')
export class AuthController {
    public constructor(
        @inject(TYPES.JsonWebTokenUtils)
        private readonly _jsonWebTokenUtils: IJsonWebTokenUtils,
    ) {}

    @httpPost('', TYPES.FildsAuth, TYPES.UserPassword)
    public async createJWT(
        req: Request,
        res: Response,
    ): Promise<Response>  {
        try {
            let newJWT: IJWT = this._jsonWebTokenUtils.createJWT(req.body.userId);
            return res.status(201).send(newJWT);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpPost('/refresh-token', TYPES.JWTNeeded, TYPES.RefreshBodyField, TYPES.RefreshNeeded)
    public async refreshJWT(
        req: Request,
        res: Response,
    ): Promise<Response>  {
        try {
            let newJWT: IJWT = this._jsonWebTokenUtils.createJWT(req.body.userId);
            return res.status(201).send(newJWT);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
