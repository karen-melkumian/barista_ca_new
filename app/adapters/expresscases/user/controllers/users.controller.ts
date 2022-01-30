import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
} from 'inversify-express-utils';
import { SecurePass } from 'argon2-pass';
import { TYPES } from '../../../container/types';
import { IUserService } from '../../../../usecases/user/user.services';

@controller('/users')
export class UsersController {
    public constructor(
      @inject(TYPES.UserService)
      private readonly _userService: IUserService,
    ) {}

    @httpGet('/', TYPES.JWTNeeded)
    async listUsers(req: Request, res: Response): Promise<void | Response> {
        try {
            const users = await this._userService.listUsers(100, 0);
            return res.status(200).send(users);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpPost('/', TYPES.RequiredCreateUserBodyFields)
    async createUser(req: Request, res: Response): Promise<void | Response> {
      try {
            const sp = new SecurePass();
            const password = Buffer.from(req.body.password);
            req.body.password = (await sp.hashPassword(password)).toString('utf-8');
            const userId = await this._userService.create(req.body);
            return res.status(200).send({id: userId});
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpPut('/', TYPES.JWTNeeded, TYPES.UserExists)
    async put(req: Request, res: Response): Promise<void | Response> {
        try {
            await this._userService.update(req.body);
            return res.status(204).send(``);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpDelete('/:userId', TYPES.JWTNeeded, TYPES.UserExists)
    async removeUser(req: Request, res: Response): Promise<void | Response> {
        try {
            await this._userService.deleteById(req.params.userId);
            return res.status(204).send(``);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpGet('/:userId', TYPES.JWTNeeded, TYPES.UserExists)
    async getUserById(req: Request, res: Response): Promise<void | Response> {
        try {
            const user = await this._userService.readById(req.params.userId);
            if(!user) { return res.status(200).send('User is not found'); }
            return res.status(200).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
