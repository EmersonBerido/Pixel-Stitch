import {Router} from 'express';
import { createProject, getAllProjects, getProject, updateProjectCurrentRow, updateProjectDetails } from '../controllers/project.controller';
import { verifyToken } from '../middleware/authentication';

const router = Router();

router.get('/', verifyToken, getAllProjects);
router.get('/:projectID', verifyToken, getProject)
router.post('/create', verifyToken, createProject);
router.patch('/updateCurrentRow', verifyToken, updateProjectCurrentRow);
router.patch('/updateDetails', verifyToken, updateProjectDetails);

export default router;