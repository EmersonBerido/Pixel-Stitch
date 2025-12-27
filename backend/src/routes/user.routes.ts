import {Router} from 'express';
import {getUserProfile, updateUserProfile } from '../controllers/user.controller';

const router = Router();

router.get('/profile:id', getUserProfile);
router.patch('/profile:id', updateUserProfile);

export default router;