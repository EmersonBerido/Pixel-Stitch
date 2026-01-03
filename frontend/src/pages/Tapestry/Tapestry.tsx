import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorCount from "./Components/ColorCount";
import Instructions from "./Components/Instructions";
import Grid from "./Components/Grid";

function Tapestry() {
  const id = Number(useParams().id) || -1;
  const [grid, setGrid] = useState<string[][]>([]);
  const [currRow, setCurrRow] = useState<number>(-1);

  // Get Grid
  useEffect(() => {
    // Negative id is reserved for guest tapestry

    // if guest tapestry, fetch from localStorage, else, fetch from database
    if (id < 0) {
      const localGrid = localStorage.getItem("grid");
      setGrid(localGrid != null ? JSON.parse(localGrid) : []);
    } else {
      // Fetch from database using id



    }
  }, [])

  function UpdateRow(change : number) {
    // -1 for foundation chain
    const newRow = currRow + change;
    if (newRow >= grid.length || newRow < -1) return

    setCurrRow(newRow);
  }

  function printInstructions(){
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
      <h1>Tapestry Page</h1>

      <Grid grid={grid} size={20}/>      
      <div>
        <h1>List of Colors</h1>
        <button onClick={() => UpdateRow(-1)}>Back 1 row</button>
        <button onClick={() => UpdateRow(1)}>Up 1 row</button>
        <ColorCount grid={grid}/>
        {grid[0] &&
          printInstructions()
        }
      </div>


    </main>
  )
}

export default Tapestry;