import { injectable, inject } from 'inversify'
import { Document, Model } from 'mongoose';
import { TYPES } from '../../../container/types';
import { DbClient } from "../../../utils/mongoose_client";
import { IUserEntity, IUserQuery } from '../../../../entities/user.entities';
import { CRUD } from "../../../../usecases/repository_interfaces";
import * as shortUUID from "short-uuid";
import { hasOwnProperty } from '../../../../entities/entity.helper'

export interface IUserDoc extends Document {
    _id: string,
    name: string,
    email: string,
    description: string,
    password: string,
    permissionLevel: number,
}

export interface IUserModel extends Model<IUserDoc> {
    build(attr: IUserEntity & { _id: string, rating: number }): IUserDoc
}

@injectable()
export class UserDao implements CRUD<IUserEntity, IUserQuery> {

    public constructor(
        @inject(TYPES.MongooseClient)
        private readonly _mongooseClient: DbClient,
    ) {}

    private Schema = this._mongooseClient.Schema;

    private userSchema = new this.Schema({
        _id: {type: this.Schema.Types.String, required: true},
        name: {type: this.Schema.Types.String, required: false},
        email: {type: this.Schema.Types.String, required: true},
        description: {type: this.Schema.Types.String, required: false},
        password: {type: this.Schema.Types.String, required: true},
        permissionLevel: {type: this.Schema.Types.Number, required: true, default: 0},
    });

    private User = this._mongooseClient.model<IUserDoc, IUserModel>('User', this.userSchema);

    public async create(resource: IUserEntity): Promise<string> {
        resource._id = shortUUID.generate();
        const user = new this.User(resource);
        await user.save();
        return resource._id;
    }

    public async deleteById(resourceId: string): Promise<void> {
        await this.User.deleteOne({_id: resourceId});
    }

    public async readById(resourceId: string): Promise<IUserEntity | null> {
        return this.User.findOne({_id: resourceId});
    }

    public async readByFilds(resource: IUserQuery): Promise<IUserEntity | null> {
        let query: IUserQuery = {};
        if (hasOwnProperty(resource, 'name')) { query.name = resource.name; }
        if (hasOwnProperty(resource, 'email')) { query.email = resource.email; }
        if (hasOwnProperty(resource, 'description')) { query.description = resource.description; }
        if (hasOwnProperty(resource, 'password')) { query.password = resource.password; }
        if (hasOwnProperty(resource, 'permissionLevel')) { query.permissionLevel = resource.permissionLevel; }

        return this.User.findOne(query);
    }

    public async list(limit: number = 25, page: number = 0, order: string | null)
        : Promise<Array<IUserEntity & { _id: string }> | null> {
        order = order ?? '_id';
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .sort('-' + order)
            .exec();
    }

    public async patch(resource: IUserEntity): Promise<IUserEntity | null> {
        let user: IUserDoc | null = await this.User.findById(resource._id);
        if (user) {
            user.name = resource.name ?? '';
            user.email = resource.email;
            user.description = resource.description ?? '';
            user.password = resource.password;
            user.permissionLevel = resource.permissionLevel ?? 0;
            await user.save();
            return resource;
        }
        return null;
    }
}
