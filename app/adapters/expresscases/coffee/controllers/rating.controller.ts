import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpGet,
    httpPut,
} from 'inversify-express-utils';
import { TYPES } from '../../../container/types';
import { IRatingService } from '../../../../usecases/coffee/rating.services';

@controller('/coffee-beans-rating')
export class RatingController {
    public constructor(
        @inject(TYPES.RatingService)
        private readonly _ratingService: IRatingService,
    ) {}

    @httpGet('/')
    async listRatings(req: Request, res: Response): Promise<void | Response> {
        try {
            const coffeeBeans = await this._ratingService.listCoffeeBeans(3, 0);
            return res.status(200).send(coffeeBeans);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    @httpPut('/', TYPES.RequiredForIncrementRatingFields, TYPES.SameCoffeeBeanExist, TYPES.ExtractCoffeeBeanFilds)
    async incrementRatingCoffeeBeans(req: Request, res: Response): Promise<void | Response> {
        try {
            await this._ratingService.updateRatingById(req.body);
            return res.status(204).send(``);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
