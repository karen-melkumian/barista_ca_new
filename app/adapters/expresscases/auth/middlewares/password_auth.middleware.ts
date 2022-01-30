import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { SecurePass } from 'argon2-pass';
import { IUserEntity } from '../../../../entities/user.entities';
import { TYPES } from '../../../container/types';
import { IUserService } from '../../../../usecases/user/user.services';

@injectable()
export class UserPassword extends BaseMiddleware {
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
        const user: IUserEntity | null = await this._userService.getByEmail(req.body.email);
        if (user) {
            let passwordHash = user.password;
            const sp = new SecurePass();
            const passwordBuffer = Buffer.from(passwordHash, 'utf8');
            const requestPassword = Buffer.from(req.body.password, 'utf8');
            const result = await sp.verifyHash(requestPassword, passwordBuffer);
            if (SecurePass.isValid(result)) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    provider: 'email',
                    permissionLevel: user.permissionLevel,
                };
                return next();
            } else {
                res.status(400).send({errors: `Invalid e-mail and/or password`});
            }
        } else {
            res.status(400).send({errors: `Invalid e-mail and/or password`});
        }
    }
}
