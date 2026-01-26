import { useLocation } from "react-router-dom";

import Grid from "../Tapestry/Components/Grid";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";

function CreateProject() {
  const [isVisible, setIsVisible] = useState<string>("public")
  const {state} = useLocation()
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (!state || !state.grid) navigate("/create-tapestry")
  }, [navigate, state]);

  if (!state || !state.grid) return null;
  
  const grid : string[][] = state.grid;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    const name : string = formData.get("project_name") as string;
    const description : string = formData.get("project_description") as string;
    const visibility : boolean = 
      (formData.get("visibility") as string) === "public" ?
      true : false;
    const createdTime : Date = new Date();
    const updatedTime = createdTime;

    const body = {
      projectName : name,
      description : description,
      createdAt : createdTime,
      updatedAt : updatedTime,
      isVisible : visibility,
      grid : grid
    }

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}projects/create`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        body : JSON.stringify(body)
      })
        .then(response => response.text())
        .then(tapestryID => navigate(`/tapestry/${tapestryID}`));
            
    } catch (err) {
      console.log(err)
    }



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
        <NavBar />
        <h1>Create Project Page</h1>
        {state.grid && <Grid grid={grid} size={6}/>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="project_name" placeholder="Project Name" required/>

          <textarea rows={4} name="project_description" placeholder="Description..." required/>
          
          <select 
          value={isVisible}
          required
          name="visibility"
          onChange={event => setIsVisible(event.target.value)}
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