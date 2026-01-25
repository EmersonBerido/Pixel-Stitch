import { Request, Response, NextFunction } from "express";
import type {Project} from "../../../shared/types/project"
import jwt from "jsonwebtoken";
import { getTapestryDB, addTapestryDB, getProjectDB, addProjectDB, getAllProjectsDB } from "../db/projects/projects.db";


async function getAllProjects(req: Request, res: Response) {
  // Get user email from req.user
  const email = req.user.emaill

  // Find all projects in database
  const projectList : Project[] | null = await getAllProjectsDB(email);
  if (!projectList) res.status(404).send("Projects Not Found")

  // Return all project details to frontend
  return res.status(200).json(projectList);

}

async function getProject(req : Request, res : Response) {
  // Get id from params
  const projectID : number = Number(req.params.projectID);
  console.log("projectID:", projectID)

  // Get project from database 
  const project : Project | null = await getProjectDB(projectID, req.user.email)
  console.log(req.user.email)
  if (!project) res.status(404).send("Project Not Found");

  // Return project to frontend
  return res.status(200).json(project);
}

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

async function updateProject(req : Request, res : Response) {
  // Get Project ID from req.params
  // Update project details from body

}

export { getAllProjects, getProject, createProject };