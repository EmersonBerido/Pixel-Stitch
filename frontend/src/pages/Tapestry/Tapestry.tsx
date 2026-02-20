import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorCount from "./Components/ColorCount";
import Instructions from "./Components/Instructions";
import Grid from "./Components/Grid";
import NavBar from "../../components/NavBar/NavBar";

// TODO:
/*
- Add Edit Tapestry functionality (New Page)
  - Updates the tapestry in the database
*/

function Tapestry() {
  const id = Number(useParams().id) || -1;
  const [grid, setGrid] = useState<string[][]>([]);
  const [currRow, setCurrRow] = useState<number>(-1);

  // Get Grid
  useEffect(() => {
    (async () => {
      // Negative id is reserved for guest tapestry
  
      // Guest User's Tapestry in localStorage
      if (id < 0) {
        const localGrid = localStorage.getItem("grid");
        setGrid(localGrid != null ? JSON.parse(localGrid) : []);
    
      } else {
        // Registered User's Tapestry from backend
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}tapestries/${id}`, {
          method : "GET",
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
          }
        });
        
        if (response.status !== 200) {
          alert("No Tapestry exist");
        }
        else {
          const data = await response.json();
          setGrid(data);
        }
      }
    })();
  }, [])

  function UpdateRow(change : number) {
    // -1 for foundation chain
    const newRow = currRow + change;
    if (newRow >= grid.length || newRow < -1) return

    setCurrRow(newRow);
  }

  function printInstructions(){
    if (grid.length === 0) return null;

    if (currRow < 0){

      return <Instructions
        row={grid[0]}
          stitch="sc"
          maxRow={grid.length}
          currRow={-1}
          frontSide={true}
          rowLength={grid[0].length}
      />

    } else if (currRow < grid.length) {

      return <Instructions
        row={grid[currRow]}
          stitch="sc"
          maxRow={grid.length}
          currRow={currRow}
          frontSide={true}
          rowLength={grid[0].length}
      />
      
    }
    else {
      return <></>
    }
  }

  

  
  return (
    <main>
      <NavBar />
      <h1>Tapestry Page</h1>

      {grid && grid.length > 0 &&
        <>
          <Grid grid={grid} size={20} currRow={currRow + 1}/>      
          <div>
            <h1>List of Colors</h1>
            <button onClick={() => UpdateRow(-1)}>Back 1 row</button>
            <button onClick={() => UpdateRow(1)}>Up 1 row</button>
            <ColorCount grid={grid}/>
            {grid.length > 0 &&
              printInstructions()
            }
          </div>

        </>
      }
      


    </main>
  )
}

export default Tapestry;