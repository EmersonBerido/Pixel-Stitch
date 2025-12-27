import {Router} from 'express';
const router = Router();

router.post('/', (req, res) => {
  // TODO: Save tapestry data from body to the database
  res.send('Tapestry created');
});

router.get('/', (req, res) => {
  // TODO: Fetch and return all tapestries
  res.send('All tapestries');
});

router.get('/:id', (req, res) => {
  // TODO: Fetch and return a tapestry by ID  
  // Return name, description, grid, and estimated yarnage
  res.send(`Tapestry with ID: ${req.params.id}`);
});

router.put('/:id', (req, res) => {
  // TODO: Update a tapestry by ID
  res.send(`Tapestry with ID: ${req.params.id} updated`); 
});

router.delete('/:id', (req, res) => {
  // TODO: Delete a tapestry by ID
  res.send(`Tapestry with ID: ${req.params.id} deleted`);
})

export default router;