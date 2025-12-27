import {Router} from 'express';
import { getProject, createProject } from '../controllers/project.controller';

const router = Router();

router.get('/:user-id', getProject);
router.post('/', createProject);