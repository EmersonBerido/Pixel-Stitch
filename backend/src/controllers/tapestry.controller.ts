import { Request, Response} from "express";
import { getTapestryDB, updateTapestryDB, deleteTapestryDB } from "../db/tapestries/tapestries.db";

async function getTapestry(req: Request, res: Response) {
  // TODO: Fetch and return a tapestry by ID  
  console.log("hi")
  const tapestryID : number = Number(req.params.id);
  
  const tapestry : string[][] | null = await getTapestryDB(tapestryID, req.user.email);
  if (!tapestry) return res.status(404).send("Tapestry not found");

  // Return tapestry grid data
  return res.status(200).json(tapestry);
} 

async function updateTapestry(req: Request, res: Response) {
  // TODO: Update a tapestry by ID
  // At most, updates everything except the ID
  res.send(`Tapestry with ID: ${req.params.id} updated`); 
}

async function deleteTapestry(req: Request, res: Response) {
  // TODO: Delete a tapestry by ID
  res.send(`Tapestry with ID: ${req.params.id} deleted`);
}

export { getTapestry, updateTapestry, deleteTapestry };