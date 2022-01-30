import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {BaseMiddleware} from 'inversify-express-utils';
import {TYPES} from '../../../container/types';
import { IUserService } from '../../../../usecases/user/user.services';
//import {User, UserRepository} from '../entities/user.entity';
//import {DatabaseService} from '../services/database.service';

@injectable()
export class UserExists extends BaseMiddleware {
    constructor(
        @inject(TYPES.UserService)
        private readonly _userService: IUserService,
    ) {
        super();
    }

    public async handler(
        req: Request, //& {user: User},
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const user = await this._userService.readById(req.params.userId);
        if (user) {
            next();
        } else {
            return res.status(404).send({error: `User ${req.params.userId} not found`});
        }
    }
}
