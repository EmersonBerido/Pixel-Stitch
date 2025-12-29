import {Router} from 'express';
import { authLogin, authRegister, authForgotPassword, authResetPassword } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/authentication';

const router = Router();

router.post('/login', authLogin);
router.post('/register', authRegister);
router.post('/forgot-password', authForgotPassword);
router.patch('/reset-password/:token', verifyToken, authResetPassword);

export default router;