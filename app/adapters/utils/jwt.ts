import { injectable } from 'inversify';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import * as crypto from 'crypto';
import { configApp } from '../config/config';

const TOKEN_EXPIRATION_IN_SECONDS = 3600;

export interface IJWT {
    accessToken: string,
    refreshToken: string,
}

export interface IJsonWebTokenUtils {
    decode(token: string): any;
    hash(refreshKey: string, userId: string): string;
    createJWT(userId: string): IJWT;
};

@injectable()
export class JsonWebTokenUtils implements IJsonWebTokenUtils {
    private readonly _jwtSecret: string = configApp.jwtSecret;

    public decode(token: string): string | JwtPayload {
        return verify(token, this._jwtSecret);
    }

    public hash(refreshKey: string, userId: string): string {
        return crypto.createHmac('sha512', refreshKey).update(userId + this._jwtSecret).digest("base64");
    }

    public createJWT(userId: string): IJWT {
        let refreshId = userId + this._jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        let body = {
            refreshKey: salt,  
        };
        let token = sign(body, this._jwtSecret, { expiresIn: TOKEN_EXPIRATION_IN_SECONDS });
        let b = Buffer.from(hash);
        let refreshToken = b.toString('base64');
        return {
            accessToken: token,
            refreshToken: refreshToken,
        }
    }
 }
