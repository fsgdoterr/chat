import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api.error";
import tokenService from "../services/token.service";
import { IUser } from "../interfaces/user.interfaces";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1];

        if(!token)
            throw ApiError.unauthorized();

        const userData = tokenService.verifyAccess(token);

        if(!userData)
            throw ApiError.unauthorized();

        req.user = userData;

        next();

    } catch(e) {
        throw ApiError.unauthorized();
    }
}