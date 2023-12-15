import { Router } from 'express';
import userController from '../controllers/user.controller';
import { body } from 'express-validator';
import validateMiddleware from '../middlewares/validate.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import fileMiddleware from '../middlewares/file.middleware';
import { FILE_SIZE, IMAGE_MIMES } from '../utils/consts';

const userRouter = Router();

userRouter.get(
    '/forgot-password/:email', 
    userController.forgotPassword
);

userRouter.post(
    '/change-password',
    body('email')
        .isEmail()
        .withMessage('Incorrect email'),
    body('code')
        .notEmpty()
        .withMessage('Incorrect code'),
    body('password')
        .isLength({min: 6, max: 24})
        .withMessage('The password must consist of a minimum of 6 characters and a maximum of 24'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if(value !== req.body.password)
                throw Error('Passwords do not match');

            return true;
        }),
    validateMiddleware,
    userController.changePassword
);

userRouter.patch(
    '/',
    fileMiddleware({
        avatar: {
            required: false,
            isArray: false,
            mimetypes: [
                IMAGE_MIMES.JPEG,
                IMAGE_MIMES.PNG,
                IMAGE_MIMES.WEBP,
            ],
            maxSize: 10 * FILE_SIZE.MB,
        }
    }),
    authMiddleware,
    userController.update,
);

userRouter.get(
    '/search',
    authMiddleware,
    userController.getAll
);


export default userRouter;