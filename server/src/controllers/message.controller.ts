import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import messageService from "../services/message.service";

class MessageController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                body: { receiver, body },
            } = req;

            const attachments = req.files?.attachments as UploadedFile[];
            
            const message = await messageService.create(id, receiver, body, attachments);

            res.json(message);
        } catch(e) {
            next(e);
        }
    }
    
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                params: { chatId },
                headers: { _limit, _offset },
            } = req;

            const { messages, totalCount} = await messageService.getAll(id, chatId, _limit ? +_limit : 20, _offset ? +_offset : 0);

            res.setHeader('total-count', totalCount);

            res.json(messages);
        } catch(e) {
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                params: { messageId },
            } = req;

            const message = await messageService.delete(id, messageId);

            res.json(message);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                params: { chatId }
            } = req;

            const message = await messageService.getOne(id, chatId);

            res.json(message);
        } catch(e) {
            next(e);
        }
    }

    async view(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                params: { messageId }
            } = req;

            const message = await messageService.view(id, messageId);

            res.json(message);
        } catch(e) {
            next(e);
        }
    }

}

export default new MessageController();