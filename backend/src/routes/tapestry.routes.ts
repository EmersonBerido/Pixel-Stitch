import {Router} from 'express';
import { getTapestry, updateTapestry, deleteTapestry } from '../controllers/tapestry.controller';
import { verifyToken, optionalVerifyToken } from '../middleware/authentication';

const router = Router();

router.get('/:id', optionalVerifyToken, getTapestry);
router.patch('/:id', verifyToken, updateTapestry);
router.delete('/:id', verifyToken, deleteTapestry);

export default router;