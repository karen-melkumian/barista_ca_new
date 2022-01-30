import { Container } from 'inversify';
import '../expresscases/home/controllers/home.controller';
import '../expresscases/auth/controllers/auth.controller';
import '../expresscases/coffee/controllers/rating.controller';
import '../expresscases/coffee/controllers/coffe.controller';
import '../expresscases/user/controllers/users.controller';
import { IRatingService, RatingService } from '../../usecases/coffee/rating.services';
import { ICoffeeBeanService, CoffeeBeanService } from '../../usecases/coffee/coffee.services';
import { IUserService, UserService } from '../../usecases/user/user.services';
import { CRUD } from "../../usecases/repository_interfaces";
import { ICoffeeBeanEntity } from "../../entities/coffee.entities";
import { IUserEntity, IUserQuery } from "../../entities/user.entities";
import { CoffeeDao } from '../expresscases/coffee/daos/coffee.dao';
import { UserDao } from '../expresscases/user/daos/users.dao';
import { IJsonWebTokenUtils, JsonWebTokenUtils } from '../utils/jwt';
import { BaseMiddleware } from 'inversify-express-utils';
import { JWTNeeded } from '../expresscases/auth/middlewares/jwt.middleware';
import { RefreshNeeded } from '../expresscases/auth/middlewares/refresh_jwt.middleware';
import { RefreshBodyField } from '../expresscases/auth/middlewares/refresh_field_jwt.middleware';
import { FildsAuth } from '../expresscases/auth/middlewares/field_auth.middleware';
import { UserPassword } from '../expresscases/auth/middlewares/password_auth.middleware';
import { RequiredCreateUserBodyFields } from '../expresscases/user/middlewares/user_fields.middleware';
import { SameEmailDoesntExist } from '../expresscases/user/middlewares/same_email.middleware';
import { UserExists } from '../expresscases/user/middlewares/user_exists.middleware';
import { ExtractUserId } from '../expresscases/user/middlewares/extract_user_id.middleware copy';
import { RequiredForIncrementRatingFields } from '../expresscases/coffee/middlewares/coffee_increment_fields.middleware'
import { RequiredCreateCoffeeBodyFields } from '../expresscases/coffee/middlewares/coffee_fields.middleware';
import { SameCoffeeBeanDoesntExist } from '../expresscases/coffee/middlewares/coffee_doesnt_exist.middleware'
import { SameCoffeeBeanExist } from '../expresscases/coffee/middlewares/same_coffee_exist.middleware';
import { CoffeeBeanExist } from '../expresscases/coffee/middlewares/coffee_exist.middleware';
import { ExtractCoffeeBeanFilds } from '../expresscases/coffee/middlewares/extract_coffee_filds.middleware';
import {TYPES} from './types';

export const container = new Container();
// Middlewares
container.bind<BaseMiddleware>(TYPES.JWTNeeded).to(JWTNeeded);
container.bind<BaseMiddleware>(TYPES.RefreshNeeded).to(RefreshNeeded);
container.bind<BaseMiddleware>(TYPES.RefreshBodyField).to(RefreshBodyField);
container.bind<BaseMiddleware>(TYPES.FildsAuth).to(FildsAuth);
container.bind<BaseMiddleware>(TYPES.UserPassword).to(UserPassword);
container.bind<BaseMiddleware>(TYPES.RequiredCreateUserBodyFields).to(RequiredCreateUserBodyFields);
container.bind<BaseMiddleware>(TYPES.SameEmailDoesntExist).to(SameEmailDoesntExist);
container.bind<BaseMiddleware>(TYPES.UserExists).to(UserExists);
container.bind<BaseMiddleware>(TYPES.ExtractUserId).to(ExtractUserId);
container.bind<BaseMiddleware>(TYPES.RequiredForIncrementRatingFields).to(RequiredForIncrementRatingFields);
container.bind<BaseMiddleware>(TYPES.RequiredCreateCoffeeBodyFields).to(RequiredCreateCoffeeBodyFields);
container.bind<BaseMiddleware>(TYPES.SameCoffeeBeanDoesntExist).to(SameCoffeeBeanDoesntExist);
container.bind<BaseMiddleware>(TYPES.SameCoffeeBeanExist).to(SameCoffeeBeanExist);
container.bind<BaseMiddleware>(TYPES.CoffeeBeanExist).to(CoffeeBeanExist);
container.bind<BaseMiddleware>(TYPES.ExtractCoffeeBeanFilds).to(ExtractCoffeeBeanFilds);
// Services
container.bind<IRatingService>(TYPES.RatingService).to(RatingService);
container.bind<ICoffeeBeanService>(TYPES.CoffeeBeanService).to(CoffeeBeanService);
container.bind<IUserService>(TYPES.UserService).to(UserService);
// Repositories
container.bind<CRUD<ICoffeeBeanEntity, ICoffeeBeanEntity>>(TYPES.CoffeeBeanRepository).to(CoffeeDao).inSingletonScope();
container.bind<CRUD<IUserEntity, IUserQuery>>(TYPES.UserRepository).to(UserDao).inSingletonScope();
// Utils
container.bind<IJsonWebTokenUtils>(TYPES.JsonWebTokenUtils).to(JsonWebTokenUtils).inSingletonScope();
