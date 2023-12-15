import { Router } from 'express';
import userController from '../controllers/user.controller';
import { body } from 'express-validator';
import validateMiddleware from '../midlewares/validate.middleware';
import authMiddleware from '../midlewares/auth.middleware';
import fileMiddleware from '../midlewares/file.middleware';

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
        }
    }),
    authMiddleware,
    userController.update,
);


export default userRouter;