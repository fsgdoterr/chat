import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import messageController from '../controllers/message.controller';
import { body } from 'express-validator';
import validateMiddleware from '../middlewares/validate.middleware';

const messageRouter = Router();

messageRouter.post(
    '/',
    authMiddleware,
    body('receiver')
        .notEmpty()
        .withMessage('The recipient should be included in the message'),
    validateMiddleware,
    messageController.create
);

messageRouter.get(
    '/chat/:chatId',
    authMiddleware,
    messageController.getOne
);

messageRouter.get(
    '/:chatId',
    authMiddleware,
    messageController.getAll
);

messageRouter.get(
    '/view/:messageId',
    authMiddleware,
    messageController.view
)

messageRouter.delete(
    '/:messageId',
    authMiddleware,
    messageController.delete
);


export default messageRouter;