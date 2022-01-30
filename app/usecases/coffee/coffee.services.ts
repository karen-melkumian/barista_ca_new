import { inject, injectable } from 'inversify'
import { TYPES } from '../../adapters/container/types'
import { ICoffeeBeanEntity } from '../../entities/coffee.entities'
import { CRUD } from '../repository_interfaces';

export interface ICoffeeBeanService {
    listCoffeeBeans(limit: number, page: number): Promise<Array<ICoffeeBeanEntity> | null>;
    create(resource: ICoffeeBeanEntity): Promise<string>;
    update(resource: ICoffeeBeanEntity): Promise<ICoffeeBeanEntity | null>;
    deleteById(resourceId: string): Promise<void>;
    readById(resourceId: string): Promise<ICoffeeBeanEntity | null>;
    readByFilds(resource: ICoffeeBeanEntity): Promise<ICoffeeBeanEntity | null>;
};

@injectable()
export class CoffeeBeanService implements ICoffeeBeanService {
    public constructor(
        @inject(TYPES.CoffeeBeanRepository)
        private readonly _coffeeRepository: CRUD<ICoffeeBeanEntity, ICoffeeBeanEntity>,
    ) {}

    public listCoffeeBeans(limit: number, page: number): Promise<Array<ICoffeeBeanEntity> | null> {
        return this._coffeeRepository.list(limit, page, null);
    }

    public create(resource: ICoffeeBeanEntity): Promise<string> {
        return this._coffeeRepository.create(resource);
    }

    public update(resource: ICoffeeBeanEntity): Promise<ICoffeeBeanEntity | null> {
        return this._coffeeRepository.patch(resource);
    }

    public deleteById(resourceId: string): Promise<void> {
        return this._coffeeRepository.deleteById(resourceId);
    }

    public readById(resourceId: string): Promise<ICoffeeBeanEntity | null> {
        return this._coffeeRepository.readById(resourceId);
    }

    public readByFilds(resource: ICoffeeBeanEntity): Promise<ICoffeeBeanEntity | null> {
        return this._coffeeRepository.readByFilds(resource);
    }
}
