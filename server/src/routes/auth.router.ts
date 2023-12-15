import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { body } from 'express-validator';
import validateMiddleware from '../middlewares/validate.middleware';

const authRouter = Router();

authRouter.post(
    '/signin', 
    body('email')
        .notEmpty()
        .withMessage('You need to enter an email'),
    body('password')
        .notEmpty()
        .withMessage('You need to enter a password'),
    validateMiddleware,
    authController.signin
);
authRouter.post(
    '/signup', 
    body('email')
        .isEmail()
        .withMessage('Incorrect email'),
    body('name')
        .notEmpty()
        .withMessage('You need to enter a name'),
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
    authController.signup
);
authRouter.get('/refresh', authController.refresh);
authRouter.delete('/logout', authController.logout);

export default authRouter;