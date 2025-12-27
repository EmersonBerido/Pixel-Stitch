import {Router} from 'express';
const router = Router();

router.get('/profile:id', (req, res) => {
  // TODO: Fetch and return a user profile by ID
  res.send(`User profile with ID: ${req.params.id}`);
});

router.get('/projects:id', (req, res) => {
  // TODO: Fetch and return a project by ID
  // Return project name, tapestry id, description, and state of completion
  res.send(`Project with ID: ${req.params.id}`);
})
export default router;