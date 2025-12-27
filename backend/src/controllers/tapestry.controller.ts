import { Request, Response} from "express";

function createTapestry(req: Request, res: Response) {
  // TODO: Save tapestry data from body to the database
  res.send('Tapestry created');
}

function getTapestry(req: Request, res: Response) {
  // TODO: Fetch and return a tapestry by ID  
  // Return tapestry grid data
  res.send(`Tapestry with ID: ${req.params.id}`);
} 

function updateTapestry(req: Request, res: Response) {
  // TODO: Update a tapestry by ID
  // At most, updates everything except the ID
  res.send(`Tapestry with ID: ${req.params.id} updated`); 
}

function deleteTapestry(req: Request, res: Response) {
  // TODO: Delete a tapestry by ID
  res.send(`Tapestry with ID: ${req.params.id} deleted`);
}

export { createTapestry, getTapestry, updateTapestry, deleteTapestry };