import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import tokenService from "../services/token.service";
import { TIME } from "../utils/consts";
import { UploadedFile } from "express-fileupload";

class UserController {

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params;

            userService.forgotPassword(email);

            res.end();

        } catch(e) {
            next(e)
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, code, password } = req.body;

            const user = await userService.changePassword(email, code, password);
            const {accessToken, refreshToken} = await tokenService.refresh(user);

            res.setHeader('access-token', accessToken);
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * TIME.DAY });

            res.json(user);

        } catch(e) {
            next(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                body: { name },
                user: { id },
            } = req;

            const avatar = req.files?.avatar as UploadedFile;

            const user = await userService.update(id, name, avatar);

            res.json(user);
        } catch(e) {
            next(e)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                query: { s },
                headers: { _limit, _offset },
            } = req;

            const { users, totalCount} = await userService.getAll(id, _limit ? +_limit : 10, _offset ? +_offset : 0, s as string);

            res.setHeader('total-count', totalCount);

            res.json(users);
        } catch(e) {
            next(e);
        }
    }

}

export default new UserController();