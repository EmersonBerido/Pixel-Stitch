import { Request, Response} from "express";
import { getTapestryDB, getTapestryCurrentRowDB, updateTapestryDB, deleteTapestryDB } from "../db/tapestries/tapestries.db";
import { Tapestry } from "../../../shared/types/tapestry";

async function getTapestry(req: Request, res: Response) {
  const tapestryID : number = Number(req.params.id);
  const userEmail = req.user ? req.user.email : "";

  
  const tapestry : string[][] | null = await getTapestryDB(tapestryID, userEmail);
  if (!tapestry) return res.status(404).send("Tapestry not found");
  const tapestryData : Tapestry = { grid : tapestry };

  // Return tapestry grid data 
  if (userEmail === "") return res.status(200).json(tapestryData);

  // if user owns tapestry, also return current row
  const currentRow = await getTapestryCurrentRowDB(tapestryID, userEmail);
  if (!currentRow) return res.status(200).json(tapestryData); // if error getting current row, just return tapestry without it

  tapestryData.currentRow = currentRow;
  return res.status(200).json(tapestryData);

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