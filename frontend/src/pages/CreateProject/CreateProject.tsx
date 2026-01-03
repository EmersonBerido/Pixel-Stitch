import { useLocation } from "react-router-dom";

import Grid from "../Tapestry/Components/Grid";
function CreateProject() {
  const {state} = useLocation()
  console.log("state:", state);
  const grid : string[][] = state.grid;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    console.log(formData)
    const name : string = formData.get("project_name") as string;
    const description : string = formData.get("project_description") as string;
    const isVisible : boolean = 
      (formData.get("visibility") as string) === "public" ?
      true : false;
    const createdTime : Date = new Date();
    const updatedTime = createdTime;

    // Backend will need:
    // Email (from token)
    // Project Name
    // Description
    // TapestryId (from backend/database)
    // ProjectId (from backend/database)
    // visibility
    // created Time
    // updated Time


    // Send to tapestry/:tapestryID


  }

  return (
    <main>
      <h1>Create Project Page</h1>
      {state.grid && <Grid grid={grid} size={6}/>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="project_name" placeholder="Project Name" required/>

        <textarea rows={4} name="project_description" placeholder="Description..." required/>
        
        <select 
        value={"public"}
        required
        name={"visibility"}
        >
          <option value={"public"}>Public</option>
          <option value={"private"}>Private</option>
        </select>
        <button type="submit">Submit</button>
      </form>

    </main>
  )
}

export default CreateProject;