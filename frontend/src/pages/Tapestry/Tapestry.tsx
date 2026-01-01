import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorCount from "./Components/ColorCount";

function Tapestry() {
  const id = Number(useParams().id) || -1;
  const [grid, setGrid] = useState<string[][]>([]);
  
  // Get Grid
  useEffect(() => {
    // Negative id is reserved for guest tapestry

    // if guest tapestry, fetch from localStorage, else, fetch from database
    if (id < 0) {
      const localGrid = localStorage.getItem("grid");
      setGrid(localGrid != null ? JSON.parse(localGrid) : []);
    }
  }, [])

  

  
  return (
    <main>
      <h1>Tapestry Page</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns : `repeat(${grid[0] ? grid[0].length : 0}, 20px)`,
          userSelect: "none"
        }}
      >
        {
          grid.map((row, r) =>
            row.map((pixel, c) => (
              <div
                key={`${r}-${c}`}
                style={{
                  width : 20,
                  height : 20,
                  border : "0.5px solid grey",
                  background : pixel
                }}
              />
            ))
          )
        }
      </div>
      
      <div>
        <h1>List of Colors</h1>
        <ColorCount grid={grid}/>
      </div>


    </main>
  )
}

export default Tapestry;