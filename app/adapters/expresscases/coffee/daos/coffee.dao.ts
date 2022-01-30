import 'reflect-metadata';
import { injectable, inject } from 'inversify'
import { Document, Model } from 'mongoose';
import { TYPES } from '../../../container/types';
import { DbClient } from "../../../utils/mongoose_client";
import { ICoffeeBeanEntity } from '../../../../entities/coffee.entities';
import { CRUD } from "../../../../usecases/repository_interfaces";
import * as shortUUID from "short-uuid";

export interface ICoffeeBeansDoc extends Document {
    _id: string,
    type: string,
    region: string,
    roast: string,
    rating: number
}

export interface ICoffeeBeansModel extends Model<ICoffeeBeansDoc> {
    build(attr: ICoffeeBeanEntity & { _id: string, rating: number }): ICoffeeBeansDoc
}

@injectable()
export class CoffeeDao implements CRUD<ICoffeeBeanEntity, ICoffeeBeanEntity> {

    public constructor(
        @inject(TYPES.MongooseClient)
        private readonly _mongooseClient: DbClient,
    ) {}

    private Schema = this._mongooseClient.Schema;

    private сoffeeBeanSchema = new this.Schema({
        _id: {type: this.Schema.Types.String, required: true},
        type: {type: this.Schema.Types.String, required: true},
        region: {type: this.Schema.Types.String, required: true},
        roast: {type: this.Schema.Types.String, required: true},
        rating: {type: this.Schema.Types.Number, required: true, default: 0},
    });

    private CoffeeBean = this._mongooseClient.model<ICoffeeBeansDoc, ICoffeeBeansModel>('CoffeeBean', this.сoffeeBeanSchema);

    public async create(resource: ICoffeeBeanEntity): Promise<string> {
        resource._id = shortUUID.generate();
        const coffeeBean = new this.CoffeeBean(resource);
        await coffeeBean.save();
        return resource._id;
    }

    public async deleteById(resourceId: string): Promise<void> {
        await this.CoffeeBean.deleteOne({_id: resourceId});
    }

    public async readById(resourceId: string)
        : Promise<ICoffeeBeanEntity & { _id: string, rating: number } | null> {
            console.log(resourceId);
            let res = this.CoffeeBean.findOne({_id: resourceId});
            console.log(res);
            return this.CoffeeBean.findOne({_id: resourceId});
    }

    public async readByFilds(resource: ICoffeeBeanEntity): Promise<ICoffeeBeanEntity | null> {
        return this.CoffeeBean.findOne({
            type: resource.type,
            region: resource.region,
            roast: resource.roast
        });
    }

    public async list(limit: number = 25, page: number = 0, order: string | null)
        : Promise<Array<ICoffeeBeanEntity> | null> {
        order = order ?? '_id';
        return this.CoffeeBean.find()
            .limit(limit)
            .skip(limit * page)
            .sort('-' + order)
            .exec();
    }

    public async patch(resource: ICoffeeBeanEntity): Promise<ICoffeeBeanEntity | null> {
        let coffeeBean: ICoffeeBeansDoc | null = await this.CoffeeBean.findById(resource._id);
        if (coffeeBean) {
            coffeeBean.type = resource.type;
            coffeeBean.region = resource.region;
            coffeeBean.roast = resource.roast;
            coffeeBean.rating = resource.rating ?? 0;
            await coffeeBean.save();
            return resource;
        }
        return null;
    }
}
