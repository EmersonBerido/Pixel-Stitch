import {Router} from 'express';
import { authLogin, authRegister, authForgotPassword, authResetPassword } from '../controllers/auth.controller';

const router = Router();

router.post('/login', authLogin);
router.post('/register', authRegister);
router.post('/forgot-password', authForgotPassword);
router.post('/reset-password/:token', authResetPassword);

export default router;