import {Router} from 'express';
import { createTapestry, getTapestry, updateTapestry, deleteTapestry } from '../controllers/tapestry.controller';

const router = Router();

router.post('/', createTapestry);
router.get('/:id', getTapestry);
router.patch('/:id', updateTapestry);
router.delete('/:id', deleteTapestry);

export default router;