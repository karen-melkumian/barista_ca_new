import { inject, injectable } from 'inversify'
import { TYPES } from '../../adapters/container/types'
import { ICoffeeBeanEntity } from '../../entities/coffee.entities'
import { CRUD } from '../repository_interfaces';

export interface IRatingService {
    listCoffeeBeans(limit: number, page: number): Promise<Array<ICoffeeBeanEntity> | null>;
    updateRatingById(coffeeBeanFilds: ICoffeeBeanEntity): Promise<ICoffeeBeanEntity | null>;
};

@injectable()
export class RatingService implements IRatingService {
    public constructor(
        @inject(TYPES.CoffeeBeanRepository)
        private readonly _coffeeBeanRepository: CRUD<ICoffeeBeanEntity, ICoffeeBeanEntity>,
    ) {}

    public listCoffeeBeans(limit: number, page: number): Promise<Array<ICoffeeBeanEntity> | null> {
        return this._coffeeBeanRepository.list(limit, page, 'rating');
    }

    updateRatingById(coffeeBeanFilds: ICoffeeBeanEntity & { rating: number}): Promise<ICoffeeBeanEntity | null> {
        coffeeBeanFilds.rating ++;
        return this._coffeeBeanRepository.patch(coffeeBeanFilds);
    }
}
