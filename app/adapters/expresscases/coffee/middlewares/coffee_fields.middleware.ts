import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { CoffeeBeanEntity } from '../../../../entities/coffee.entities';

@injectable()
export class RequiredCreateCoffeeBodyFields extends BaseMiddleware {
    constructor() {
        super();
    }

    public handler(
        req: Request,
        res: Response,
        next: NextFunction,
    ): void | Response {
        if (CoffeeBeanEntity.validateCreateCoffeeBodyFields(req.body)) {
            next();
        } else {
            return res.status(400).send({error: `Missing required fields type, region, roast and rating`});
        } 
    }
}
