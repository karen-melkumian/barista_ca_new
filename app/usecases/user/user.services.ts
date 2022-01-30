import { inject, injectable } from 'inversify'
import { TYPES } from '../../adapters/container/types'
import { IUserEntity, IUserQuery } from '../../entities/user.entities'
import { CRUD } from '../repository_interfaces';

export interface IUserService {
    listUsers(limit: number, page: number): Promise<Array<IUserEntity> | null>;
    getByEmail(email: string): Promise<IUserEntity | null>;
    create(resource: IUserEntity): Promise<string>;
    update(resource: IUserEntity): Promise<IUserEntity | null>;
    deleteById(resourceId: string): Promise<void>;
    readById(resourceId: string): Promise<IUserEntity | null>;
};

@injectable()
export class UserService implements IUserService {
    public constructor(
        @inject(TYPES.UserRepository)
        private readonly _userRepository: CRUD<IUserEntity, IUserQuery>,
    ) {}

    public listUsers(limit: number, page: number): Promise<Array<IUserEntity> | null> {
        return this._userRepository.list(limit, page, null);
    }

    public getByEmail(email: string): Promise<IUserEntity | null> {
        let query: IUserQuery = { email };
        return this._userRepository.readByFilds(query);
    }

    public create(resource: IUserEntity): Promise<string> {
        return this._userRepository.create(resource);
    }

    public update(resource: IUserEntity): Promise<IUserEntity | null> {
        return this._userRepository.patch(resource);
    }

    public deleteById(resourceId: string): Promise<void> {
        return this._userRepository.deleteById(resourceId);
    }

    public readById(resourceId: string): Promise<IUserEntity | null> {
        return this._userRepository.readById(resourceId);
    }
}
