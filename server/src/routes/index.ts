import { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import messageRouter from './message.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/message', messageRouter);

export default router;