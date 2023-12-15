import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api.error";

export default (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {

    console.log(err);

    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }

    return res.status(500).json({message: 'An error occurred, please try again later'});
}