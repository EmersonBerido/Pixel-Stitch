import { useState } from "react";
import {Chrome} from "@uiw/react-color";
import { useNavigate } from "react-router-dom";

function CreateTapestry() {
  const Navigate = useNavigate();
  // Grid states
  const defaultValue = "#FFFFFF"
  const [gridRowLength, setGridRowLength] = useState<number>(20);
  const [gridColLength, setGridColLength] = useState<number>(20);
  const [grid, setGrid] = useState<string[][]>(() => clearGrid());


  // Draw states
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  function paintPixel(row : number, col : number) {
    setGrid(prev => 
      prev.map((currRow, rowIndex) => 
        rowIndex === row ?
          currRow.map((pixel, colIndex) => 
            colIndex === col ? currentColor : pixel
          )
        : currRow
      )
    )
  }

  function clearGrid(){
    return Array.from({length : gridRowLength}, () =>
      Array.from({length : gridColLength}, () => defaultValue)
    )
  }

  function UpdateGridSize(updateRow : boolean, change : number){
    if (updateRow){
      // Update how many rows
      const newLength = gridRowLength + change;
      setGrid(prev => {

        if (newLength > gridRowLength){

          // Add new Row(s)
          const extra = Array.from(
            {length : newLength - gridRowLength},
             () => Array.from(
              {length : gridColLength},
              () => defaultValue
             ));

          return [...prev, ...extra];
        } else {

          // Remove row(s)
          return prev.slice(0, newLength);
        }
      })

      setGridRowLength(prev => prev + change);
    }
    else {
      // Update how many columns
      const newLength = gridColLength + change
      setGrid(prev => 
        prev.map(currRow => {

          if (newLength > currRow.length) {
            // Add columns
            const extra = Array.from(
              {length : newLength - currRow.length},
              () => defaultValue
            );
            return [...currRow, ...extra]

          }
          else {
            // Remove columns
            return currRow.slice(0 , newLength);

          }})
      )
      setGridColLength(prev => prev + change)
    }
  }

  function handleResizeKeySubmit(updateRow : boolean, input : React.KeyboardEvent<HTMLInputElement>){
    if (input.key != "Enter") return

    // Get appropiate value for UpdateGridSize
    let value = Number((input.target as HTMLInputElement).value)
    value = updateRow ? value - gridRowLength : value - gridColLength;

    // Update appropiate row/column
    if (updateRow)
      UpdateGridSize(true, value);
    else 
      UpdateGridSize(false, value);
    
  }

  async function SaveGrid(){
    // Check if user is logged in
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}verifyLogin`, {
      headers : {
        "Authorization" : `bearer ${localStorage.getItem("token")}`
      }
    })

    if (response.status !== 200) {
      // User not logged in, send to Tapestry
      console.log("User is not logged in, going to")
      localStorage.setItem("grid", JSON.stringify(grid));
      Navigate("/tapestry/-1");
    } else {
      // User logged in, send to CreateProject
      console.log("User is logged in, navigating to create Project")
      Navigate("/create-project", {state : {grid : grid}})
    }

  }

  //Event handlers
  function handleMouseDown(row : number, col : number){
    setIsDrawing(true);
    paintPixel(row, col);
  }

  function handleMouseEnter(row : number, col : number) {
    if (isDrawing) paintPixel(row, col);
  }

  function handleMouseUp() {
    setIsDrawing(false);
  }

  return (
    <main>
      <h1>Create Tapestry</h1>
      <Chrome
        color={currentColor}
        onChange={color => setCurrentColor(color.hex)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns : `repeat(${grid[0].length}, 20px)`,
          userSelect: "none"
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {
          grid.map((row, r) =>
            row.map((pixel, c) => (
              <div
                key={`${r}-${c}`}
                onMouseDown={() => handleMouseDown(r,c)}
                onMouseEnter={() => handleMouseEnter(r,c)}
                style={{
                  width : 20,
                  height : 20,
                  border : "0.5px solid grey",
                  background : pixel === currentColor ? currentColor : pixel
                }}
              />
            ))
          )
        }
      </div>

      <button onClick={() => setGrid(clearGrid)}>Clear Grid</button>
      <button onClick={() => console.log(grid)}>Log Grid</button>
      <button onClick={SaveGrid}>Save</button>

      <div style={{background : "pink", zIndex : 2}}>
        <h1>Increase/Decrease Rows</h1>
        <button onClick={() => UpdateGridSize(true, -1)}>-</button>
        <input onKeyDown={key => handleResizeKeySubmit(true, key)}type="number"/>
        <button onClick={() => UpdateGridSize(true, 1)}>+</button>
      </div>

      <div style={{background : "pink", zIndex : 2}}>
        <h1>Increase/Decrease Columns</h1>
        <button onClick={() => UpdateGridSize(false, -1)}>-</button>
        <input onKeyDown={key => handleResizeKeySubmit(false, key)}type="number"/>
        <button onClick={() => UpdateGridSize(false, 1)}>+</button>
      </div>



    </main>
  )
}

export default CreateTapestry;