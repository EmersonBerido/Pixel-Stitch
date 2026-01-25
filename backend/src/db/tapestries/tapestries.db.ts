import { supabase } from "../../supabaseClient";

// string[][] returned if email owns tapestry or tapestry is public
async function getTapestryDB(id : number, email : string) : Promise<string[][] | null>{
  const {data, error} = await supabase
    .from("Tapestries")
    .select("grid")
    .or(`user_email.eq.${email},is_public.eq.true`)
    .eq("id", id)
    .single()

  if (error || !data) return null;

  return data.grid as string[][];
}

async function updateTapestryDB(id : number, newGrid : string[][]) : Promise<boolean>{
  const {data, error} = await supabase
    .from("Tapestries")
    .update({
      grid : newGrid
    })
    .eq("id", id)
    
  return !error;
}

async function deleteTapestryDB(id : number) : Promise<boolean>{
  const {data, error} = await supabase
    .from("Tapestries")
    .delete()
    .eq("id", id)
    .single()

  return !error;
}

export {getTapestryDB, updateTapestryDB, deleteTapestryDB}