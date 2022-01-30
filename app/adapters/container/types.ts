export const TYPES = {
    App: Symbol('App'),
    MongooseClient: Symbol('MongooseClient'),
    // Middlewares
    JWTNeeded: Symbol.for('JWTNeeded'),
    RefreshNeeded: Symbol.for('RefreshNeeded'),
    RefreshBodyField: Symbol.for('RefreshBodyField'),
    FildsAuth: Symbol.for('FildsAuth'),
    UserPassword: Symbol.for('UserPassword'),
    RequiredCreateUserBodyFields: Symbol.for('RequiredCreateUserBodyFields'),
    SameEmailDoesntExist: Symbol.for('SameEmailDoesntExist'),
    UserExists: Symbol.for('UserExists'),
    ExtractUserId: Symbol.for('ExtractUserId'),
    RequiredForIncrementRatingFields: Symbol.for('RequiredForIncrementRatingFields'),
    RequiredCreateCoffeeBodyFields: Symbol.for('RequiredCreateCoffeeBodyFields'),
    SameCoffeeBeanDoesntExist: Symbol.for('SameCoffeeBeanDoesntExist'),
    SameCoffeeBeanExist: Symbol.for('SameCoffeeBeanExist'),
    CoffeeBeanExist: Symbol.for('CoffeeBeanExist'),
    ExtractCoffeeBeanFilds: Symbol.for('ExtractCoffeeBeanFilds'),
    // Services
    RatingService: Symbol.for('RatingService'),
    CoffeeBeanService: Symbol.for('CoffeeBeanService'),
    UserService: Symbol.for('UserService'),
    // Repositories
    CoffeeBeanRepository: Symbol.for('CoffeeBeanRepository'),
    UserRepository: Symbol.for('UserRepository'),
    // Utils
    JsonWebTokenUtils: Symbol.for('JsonWebTokenUtils'),
  };
  