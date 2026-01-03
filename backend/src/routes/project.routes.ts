import {Router} from 'express';
import { getProject, createProject } from '../controllers/project.controller';
import { verifyToken } from '../middleware/authentication';

const router = Router();

router.get('/:user-id', verifyToken, getProject);
router.post('/create', verifyToken, createProject);

export default router;