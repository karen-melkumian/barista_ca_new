import { Entity } from './abstracts/entity'
import { hasOwnProperty } from './entity.helper'

export interface ICoffeeBeanEntity {
    _id?: string
    type: string,
    region: string,
    roast: string,
    rating?: number
}

export class CoffeeBeanEntity extends Entity<ICoffeeBeanEntity> {
    private constructor(props: ICoffeeBeanEntity) {
        const { _id, ...data } = props;
        super(data, _id);
    }

    public static create(props: ICoffeeBeanEntity): CoffeeBeanEntity {
        const instance = new CoffeeBeanEntity(props);
        return instance;
    }

    public unmarshal(): ICoffeeBeanEntity {
        return {
            _id: this._id,
            type: this.type,
            region: this.region,
            roast: this.roast,
            rating: this.rating,
        }
    }

    public static validateCreateCoffeeBodyFields(coffeeBean: ICoffeeBeanEntity): boolean {
        return hasOwnProperty(coffeeBean, 'type')
            && hasOwnProperty(coffeeBean, 'region')
            && hasOwnProperty(coffeeBean, 'roast')
            && hasOwnProperty(coffeeBean, 'rating');
    }

    public static validateIncrementRatingFields(coffeeBean: ICoffeeBeanEntity): boolean {
        return hasOwnProperty(coffeeBean, 'type')
            && hasOwnProperty(coffeeBean, 'region')
            && hasOwnProperty(coffeeBean, 'roast');
    }

    get id(): string {
        return this._id;
    }

    get type(): string {
        return this.props.type;
    }

    get region(): string {
        return this.props.region;
    }

    get roast(): string {
        return this.props.roast;
    }

    get rating(): number| undefined {
        return this.props.rating;
    }
}
