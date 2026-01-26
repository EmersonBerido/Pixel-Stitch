import { Request, Response, NextFunction } from "express";
import type {Project} from "../../../shared/types/project"
import jwt from "jsonwebtoken";
import { getTapestryDB, addTapestryDB, getProjectDB, addProjectDB, getAllProjectsDB, updateCurrRowDB, updateProjectDetailsDB } from "../db/projects/projects.db";
import { getIdByEmail, pushProjectList, getProjectList } from "../db/users/users.db";


async function getAllProjects(req: Request, res: Response) {
  const email = req.user.email;

  // Find user's project list
  const userId = await getIdByEmail(email);
  if (userId === null) return res.status(400).send("Failed to get User ID");
  const projectListIDs = await getProjectList(userId);
  if (projectListIDs === null) return res.status(404).send("Projects Not Found");

  // Find all projects in database
  const projectList : Project[] | null = await getAllProjectsDB(projectListIDs);
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
  const tapestryId = await addTapestryDB(grid, project.isVisible, req.user.email);
  if (tapestryId < 0) res.status(400).send("Failed to add Tapestry");
  project.tapestryId = tapestryId;

  // Save project to database
  const projectId = await addProjectDB(project);
  if (projectId < 0) res.status(400).send("Failed to add Project");

  // Attach project ID to user's project list
  const userId = await getIdByEmail(req.user.email);
  if (userId === null) res.status(400).send("Failed to get User ID");
  const pushSuccess = await pushProjectList(userId, projectId);
  if (!pushSuccess) res.status(400).send("Failed to update User's Project List");

  // Return success response with project's tapestry ID
  res.status(200).send(tapestryId);
}

/*
- Update project details
- Called in Project Edit mode
- Can update everything except ID, userEmail, tapestryId
*/
async function updateProjectDetails(req : Request, res : Response) {
  const {project_name, description, is_complete, visibility} = req.body;
  const projectID : number = Number(req.params.projectID);

  if (projectID < 0) return res.status(400).send("Invalid Project ID");
  if (!project_name || !description || is_complete === undefined || visibility === undefined) 
    return res.status(400).send("Missing project details");

  const updatedProject : Partial<Project> = {
    projectName : project_name,
    description : description,
    isComplete : is_complete,
    isVisible : visibility,
  }

  const updateSuccess = await updateProjectDetailsDB(projectID, updatedProject);

  if (!updateSuccess) return res.status(500).send("Failed to update project details");
  return res.status(200).send("Project details updated successfully");

}

// Update only the currentRow of a project
// Called only in Instruction mode
async function updateProjectCurrentRow(req : Request, res : Response) {
  const {projID, newCurrRow} = req.body;

  if (projID < 0) return res.status(400).send("Invalid Project ID");
  if (newCurrRow < 0) return res.status(400).send("Invalid currentRow value");

  const updateSuccess = await updateCurrRowDB(projID, newCurrRow);
  if (!updateSuccess) return res.status(500).send("Failed to update currentRow");
  return res.status(200).send("currentRow updated successfully");

}

export { getAllProjects, getProject, createProject, updateProjectCurrentRow, updateProjectDetails };