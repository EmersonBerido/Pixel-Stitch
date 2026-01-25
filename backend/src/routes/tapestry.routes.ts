import {Router} from 'express';
import { getTapestry, updateTapestry, deleteTapestry } from '../controllers/tapestry.controller';
import { verifyToken } from '../middleware/authentication';

const router = Router();

router.get('/:id', verifyToken, getTapestry);
router.patch('/:id', verifyToken, updateTapestry);
router.delete('/:id', verifyToken, deleteTapestry);

export default router;