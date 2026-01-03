import { Request, Response, NextFunction } from "express";
import type {Project} from "../../../shared/types/project"
import jwt from "jsonwebtoken";
import { getTapestryDB, addTapestryDB, getProjectDB, addProjectDB } from "../db/projects/projects.db";
import { Tapestry } from "../../../shared/types/tapestry";
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

// export interface Project {
//   id?: number;
//   userEmail?: string;
//   projectName: string;
//   tapestryId?: number;
//   description: string;
//   isComplete?: boolean;
//   isVisible : boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

async function createProject(req: Request, res: Response) {
  // TODO: Implement create project logic

  // Get Project info
  const project : Project = req.body as Project
  project.isComplete = false;
  project.userEmail = req.user.email;
  const grid : string[][] = req.body.grid;

  // Save Tapestry to table & get ID
  const tapestryId = await addTapestryDB(grid);
  if (tapestryId < 0) res.status(400).send("Failed to add Tapestry");
  project.tapestryId = tapestryId;

  // Save project to database (create a function for db [addProject])
  const projectId = await addProjectDB(project);
  if (projectId < 0) res.status(400).send("Failed to add Project");


  // Return success response with project ID
  res.status(200).send(projectId);
}

export { getProject, createProject };