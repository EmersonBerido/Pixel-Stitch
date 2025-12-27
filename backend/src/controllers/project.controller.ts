import { Request, Response, NextFunction } from "express";

function getProject(req: Request, res: Response) {
  // TODO: Implement get project by ID logic
  // Get user ID from req.params

  // Get project ID from req.query

  // Find project in database

  // If not found, return 404 Not Found

  // Verify that the project belongs to the user

  // If not authorized, return 403 Forbidden

  // Return project details
  res.send('Get project by ID route');
}

function createProject(req: Request, res: Response) {
  // TODO: Implement create project logic

  // Get project details from req.body

  // Save project to database

  // Return success response with project ID
  res.send('Create project route');
}

export { getProject, createProject };