import jwt from 'jsonwebtoken';
import { IUser } from "../interfaces/user.interfaces";
import tokenModel from '../models/token.model';

type JWTTokens = {
    refreshToken: string;
    accessToken: string;
}

class TokenService {

    async refresh(user: IUser): Promise<JWTTokens> {
        const { refreshToken, accessToken } = this.generateTokens(user);

        await tokenModel.findOneAndUpdate(
            {userId: user.id}, 
            {refreshToken},
            {new: true, upsert: true},
        );

        return { refreshToken, accessToken }

    }

    generateTokens(user: IUser): JWTTokens {
        const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '7d' });
        const accessToken = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '2h' });

        return { refreshToken, accessToken };
    }

    verifyRefresh(refreshToken: string): IUser | null {
        try {
            const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            return userData as IUser
        } catch(e) {
            return null
        }
    }

    verifyAccess(accessToken: string): IUser | null {
        try {
            const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            return userData as IUser
        } catch(e) {
            return null
        }
    }

    async removeToken(refreshToken: string): Promise<void> {
        const findedToken = await tokenModel.findOneAndDelete({refreshToken});
        return;
    }

}

export default new TokenService();