import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
} from 'inversify-express-utils';
import { TYPES } from '../../../container/types';
import { ICoffeeBeanService } from '../../../../usecases/coffee/coffee.services';

@controller('/coffee-beans', TYPES.JWTNeeded)
export class CoffeeBeanController {
    public constructor(
      @inject(TYPES.CoffeeBeanService)
      private readonly _coffeeBeanService: ICoffeeBeanService,
    ) {}

    @httpGet('/', TYPES.JWTNeeded)
    async listCoffeeBeans(req: Request, res: Response): Promise<void | Response> {
        try {
            const coffeeBeans = await this._coffeeBeanService.listCoffeeBeans(100, 0);
            return res.status(200).send(coffeeBeans);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpPost('/', TYPES.RequiredCreateCoffeeBodyFields, TYPES.SameCoffeeBeanDoesntExist)
    async createCoffeeBean(req: Request, res: Response): Promise<void | Response> {
      try {
            const coffeeBeanId = await this._coffeeBeanService.create(req.body);
            return res.status(200).send({id: coffeeBeanId});
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpPut('/', TYPES.JWTNeeded, TYPES.RequiredCreateCoffeeBodyFields, TYPES.CoffeeBeanExist)
    async put(req: Request, res: Response): Promise<void | Response> {
        try {
            await this._coffeeBeanService.update(req.body);
            return res.status(204).send(``);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpDelete('/:coffeeBeanId', TYPES.JWTNeeded, TYPES.CoffeeBeanExist)
    async removeUser(req: Request, res: Response): Promise<void | Response> {
        try {
            await this._coffeeBeanService.deleteById(req.params.coffeeBeanId);
            return res.status(204).send(``);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpGet('/:coffeeBeanId', TYPES.JWTNeeded, TYPES.CoffeeBeanExist)
    async getUserById(req: Request, res: Response): Promise<void | Response> {
        try {
            const coffeeBean = await this._coffeeBeanService.readById(req.params.coffeeBeanId);
            if(!coffeeBean) { return res.status(200).send('CoffeeBean is not found'); }
            return res.status(200).send(coffeeBean);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
