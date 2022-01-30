import { Entity } from './abstracts/entity'
import { hasOwnProperty } from './entity.helper'

export interface IUserQuery { 
    name?: string,
    email?: string,
    description?: string,
    password?: string,
    permissionLevel?: number,
}

export interface IUserEntity {
    _id?: string,
    name: string,
    email: string,
    description: string,
    password: string,
    permissionLevel: number,
}

export class UserEntity extends Entity<IUserEntity> {
    private constructor(props: IUserEntity) {
        const { _id, ...data } = props;
        super(data, _id);
    }

    public static create(props: IUserEntity): UserEntity {
        const instance = new UserEntity(props);
        return instance;
    }

    public unmarshal(): IUserEntity {
        return {
            _id: this._id,
            name: this.name,
            email: this.email,
            description: this.description,
            password: this.password,
            permissionLevel: this.permissionLevel,
        }
    }

    public static validateCreateUserFields(coffeeBean: IUserEntity): boolean {
        return hasOwnProperty(coffeeBean, 'email')
            && hasOwnProperty(coffeeBean, 'password');
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get description(): string {
        return this.props.description;
    }

    get password(): string {
        return this.props.password;
    }

    get permissionLevel(): number {
        return this.props.permissionLevel;
    }
}
