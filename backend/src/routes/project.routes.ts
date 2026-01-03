import {Router} from 'express';
import { createProject, getAllProjects, getProject } from '../controllers/project.controller';
import { verifyToken } from '../middleware/authentication';

const router = Router();

router.get('/', verifyToken, getAllProjects);
router.get('/:projectID', verifyToken, getProject)
router.post('/create', verifyToken, createProject);

export default router;