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
    .select()

  if (error) return -1

  // Return Project ID
  return data?.[0]?.id;

}

// Returns Project type object, NULL if failed
async function getProjectDB() {

}

// Returns String [][]
async function getTapestryDB() {

}

export {addTapestryDB, getTapestryDB, addProjectDB, getProjectDB}