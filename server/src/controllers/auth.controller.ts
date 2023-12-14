import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";
import { TIME } from "../utils/consts";

class AuthController {

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const user = await authService.signin(email, password);
            const {accessToken, refreshToken} = await tokenService.refresh(user);

            res.setHeader('access-token', accessToken);
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * TIME.DAY });

            res.json(user);
        } catch(e) {
            next(e)
        }
    }
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name } = req.body;

            const user = await authService.signup(email, password, name);
            const {accessToken, refreshToken} = await tokenService.refresh(user);

            res.setHeader('access-token', accessToken);
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * TIME.DAY });

            res.json(user);
        } catch(e) {
            next(e)
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            const user = await authService.refresh(refreshToken);
            const {accessToken, refreshToken: newRefreshToken} = await tokenService.refresh(user);

            res.setHeader('access-token', accessToken);
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * TIME.DAY });

            res.json(user);
        } catch(e) {
            next(e)
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            tokenService.removeToken(refreshToken);

            res.clearCookie('refreshToken');
            res.end();
        } catch(e) {
            next(e)
        }
    }

}

export default new AuthController();