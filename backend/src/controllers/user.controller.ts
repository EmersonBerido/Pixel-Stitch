import { Request, Response, NextFunction } from "express";

function getUserProfile(req: Request, res: Response) {
  // TODO: Fetch and return a user profile by ID
  res.send(`User profile with ID: ${req.params.id}`);
}

function updateUserProfile(req: Request, res: Response) {
  // TODO: Update a user profile by ID
  // At most, updates everything except the ID
  res.send(`User profile with ID: ${req.params.id} updated`);
}

export { getUserProfile, updateUserProfile };