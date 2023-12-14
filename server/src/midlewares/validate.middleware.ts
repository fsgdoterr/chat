import { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";
import { ApiError } from "../utils/api.error";

export default (req: Request, res: Response, next: NextFunction) => {

    const valRes = validationResult(req);
    if(!valRes.isEmpty()) {
        const errs = valRes.array() as FieldValidationError[];
        throw ApiError.badRequest(errs.shift()?.msg);
    }

    next();
}