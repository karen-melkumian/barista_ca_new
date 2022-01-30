import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {BaseMiddleware} from 'inversify-express-utils';
import {TYPES} from '../../../container/types';
import { IUserService } from '../../../../usecases/user/user.services';

@injectable()
export class SameEmailDoesntExist extends BaseMiddleware {
    constructor(
        @inject(TYPES.UserService)
        private readonly _userService: IUserService,
    ) {
        super();
    }

    public async handler(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const user = await this._userService.getByEmail(req.body.email);
        if (user) {
            return res.status(400).send({error: `User email already exists`});
        } else {
            next();
        }
    }
}
