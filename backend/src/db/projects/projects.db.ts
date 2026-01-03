import type {Project} from "../../../../shared/types/project"
import { supabase } from "../../supabaseClient";

// Note : the tapestry's grid will be a jsonb type for postgres

// Returns TapestryID, -1 if failed
async function addTapestryDB(tapestry : string[][]){
  const {data, error} = await supabase
    .from("Tapestries")
    .insert([
      {
        grid : tapestry
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

async function getAllProjectsDB(email : string) : Promise<Project[] | null> {
  const {data, error} = await supabase
    .from("Projects")
    .select("*")
    .eq("user_email", email) as { data : Project[] | null, error : any};
  
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

export {addTapestryDB, getTapestryDB, addProjectDB, getProjectDB, getAllProjectsDB}