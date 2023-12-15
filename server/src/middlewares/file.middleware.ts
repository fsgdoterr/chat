import { NextFunction, Request, Response } from "express";
import { MIME_TYPES } from "../utils/consts";
import { ApiError } from "../utils/api.error";
import { UploadedFile } from "express-fileupload";

interface Options {
    [key: string]: {
        isArray: boolean;
        required: boolean;
        mimetypes?: MIME_TYPES[];
        maxSize?: number;
    }
}

export default (options: Options) => (req: Request, res: Response, next: NextFunction) => {

    const files = req.files;

    if(files) {
        for(let key in options) {
            const opts = options[key];
            const file = files[key];

            if(opts.required && !file)
                return next(ApiError.badRequest(`${key} is required`));

            if(opts.isArray && !Array.isArray(file))
                return next(ApiError.badRequest(`${key} must be an array`));

            if(!opts.isArray && Array.isArray(file))
                return next(ApiError.badRequest(`${key} mustn't be an array`));


            const fileArr = opts.isArray ? (file as UploadedFile[]) : (file as UploadedFile);

            if(opts.maxSize && !checkMaxSize(fileArr, opts.maxSize))
                return next(ApiError.badRequest(`max size is ${opts.maxSize}`));

            if(opts.mimetypes && opts.mimetypes.length && !checkMimeTypes(fileArr, opts.mimetypes))
                return next(ApiError.badRequest(`allowed mimetypes is [${opts.mimetypes.join(', ')}]`));

        }
    }

    next();

}

const checkMimeTypes = (files: UploadedFile | UploadedFile[], mimetypes: MIME_TYPES[]): Boolean => {
    return Array.isArray(files)
        ? files.every(file => mimetypes.includes(file.mimetype as MIME_TYPES))
        : mimetypes.includes(files.mimetype as MIME_TYPES);
}

const checkMaxSize = (files: UploadedFile | UploadedFile[], maxSize: number): Boolean => {
    return Array.isArray(files)
        ? files.every(file=> file.size <= maxSize)
        : files.size <= maxSize
}