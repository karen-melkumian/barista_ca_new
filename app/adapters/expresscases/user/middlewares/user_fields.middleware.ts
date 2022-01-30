import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {BaseMiddleware} from 'inversify-express-utils';
//import {TYPES} from '../../../container/types';
//import {User, UserRepository} from '../entities/user.entity';
//import {DatabaseService} from '../services/database.service';

@injectable()
export class RequiredCreateUserBodyFields extends BaseMiddleware {
    constructor() {
        super();
    }

    public handler(
        req: Request, //& {user: User},
        res: Response,
        next: NextFunction,
    ): void | Response {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            return res.status(400).send({error: `Missing required fields email and password`});
        }
    }
}
