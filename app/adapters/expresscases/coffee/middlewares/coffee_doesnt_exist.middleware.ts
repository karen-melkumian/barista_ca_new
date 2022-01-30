import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { TYPES } from '../../../container/types';
import { ICoffeeBeanService } from '../../../../usecases/coffee/coffee.services';

@injectable()
export class SameCoffeeBeanDoesntExist extends BaseMiddleware {
    constructor(
        @inject(TYPES.CoffeeBeanService)
        private readonly _coffeeBeanService: ICoffeeBeanService,
    ) {
        super();
    }

    public async handler(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const coffeeBean = await this._coffeeBeanService.readByFilds(req.body);
        if (coffeeBean) {
            return res.status(400).send({error: `Coffee Bean already exists`});
        } else {
            next();
        }
    }
}
