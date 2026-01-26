import type {Project} from "../../../../shared/types/project"
import { supabase } from "../../supabaseClient";

// Note : the tapestry's grid will be a jsonb type for postgres

// Returns TapestryID, -1 if failed
async function addTapestryDB(tapestry : string[][], is_public : boolean, email : string = "") : Promise<number> {
  const {data, error} = await supabase
    .from("Tapestries")
    .insert([
      {
        grid : tapestry,
        user_email : email,
        is_public : is_public
      }
    ])
    .select();
  
  if (error) return -1;

  // Return Tapestry id
  return data?.[0]?.id;

}

// Returns ProjectID, -1 if failed
async function addProjectDB(project : Project) {
  const {data, error} = await supabase
    .from("Projects")
    .insert([{
      user_email : project.userEmail,
      project_name : project.projectName,
      tapestry_id : project.tapestryId,
      description : project.description,
      is_complete : project.isComplete,
      visibility : project.isVisible,
      created_at : project.createdAt,
      updated_at : project.updatedAt,
      current_row : 0
    }])
    .select();

  if (error) return -1

  // Return Project ID
  return data?.[0]?.id;

}

// Returns Project type object, NULL if failed
async function getProjectDB(projectID : number, email : string) : Promise<Project | null> {
  const {data, error} = await supabase
    .from("Projects")
    .select("*")
    .eq("user_email", email)
    .eq("id", projectID)
    .single();
  
  if (error) return null

  return data as Project;

}

async function getAllProjectsDB(projectList : number[]) : Promise<Project[] | null> {
  // Update this to use the user's project list later


  const {data, error} = await supabase
    .from("Projects")
    .select("*")
    .in("id", projectList);
  
  if (error) return null

  return data

}

// Returns String [][], NULL if failed
async function getTapestryDB(tapestryID : number) : Promise<string[][] | null> {
  const {data, error} = await supabase
    .from("Tapestries")
    .select("*")
    .eq("id", tapestryID)
    .single();
  
  
  if (error) return null // IDK what it should return on failure

  return data.grid as string[][]
}

async function updateCurrRowDB(id : number, newRow : number) {
  if (newRow < 0) return false;

  const {data, error} = await supabase
    .from("Projects")
    .update({
      current_row : newRow
    })
    .eq("id", id)

  return !error;
}

async function updateProjectDetailsDB(id : number, updatedProject : Partial<Project>) {
  if (!updatedProject) return false;

  const newDate = new Date();

  const {data, error} = await supabase
    .from("Projects")
    .update({
      project_name : updatedProject.projectName,
      description : updatedProject.description,
      is_complete : updatedProject.isComplete,
      visibility : updatedProject.isVisible,
      updated_at : newDate
    })
    .eq("id", id)
}

export {addTapestryDB, getTapestryDB, addProjectDB, getProjectDB, getAllProjectsDB, updateCurrRowDB, updateProjectDetailsDB}