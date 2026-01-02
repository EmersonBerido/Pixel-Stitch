import type { Stitch } from "../utils/yarnCalcs";
import { HexToName } from "../utils/colorLookup";
import ColorBlock from "./ColorBlock";

type Instructions = {
  row : string[],
  stitch : Stitch,
  currRow : number,
  maxRow : number,
  frontSide : boolean,
  rowLength : number
}


function Instructions(props : Instructions){
  console.log(props)
  
  // Creates a hashmap of colors for instant lookup
  const color : any = {}
  props.row.map(clr => {
    const colorName = HexToName(clr)
    if (!colorName) return;

    if (!color[colorName]){
      color[clr] = colorName
    }
  })


  

  function printInstructions() {
    if (!props.row) return "";
    
    // Set proper boundaries & initialize color trackers
    const rowLength : number = props.row.length;
    const startIdx : number = props.frontSide ? 0 : props.row.length - 1;
    let prevColor = null;
    let currColor = props.row[startIdx];

    let instructions : React.ReactNode[] = []; 

    let colorAmt = 0;
    if (props.currRow === -1){
      // Instead of using a stitch, use a chain
      instructions.push(<>Chain {rowLength} (Any Color) <br/></>)
    }
    else if (props.frontSide){

      for (let i = startIdx; i < rowLength; i++){
        currColor = props.row[i];
        if (prevColor == null) {
          prevColor = currColor;
          colorAmt = 1;
        }
        else if (prevColor == null || prevColor != currColor){
          // Changing to a new color
          instructions.push(addInstruction(colorAmt, props.stitch, prevColor));
          colorAmt = 1;
          prevColor = currColor;
          // Call helper function to concat instructions
  
        } else {
          // Keep same color
          colorAmt++;
        }
  
        prevColor = currColor;
      }

      // add instructions for last color
      instructions.push(addInstruction(colorAmt, props.stitch, currColor));

    } else { // If backside, start from the end to the beginning

      for (let i = startIdx; i >= 0; i++){
        currColor = props.row[i];
        if (prevColor == null) {
          prevColor = currColor;
          colorAmt = 1;
        }
        else if (prevColor == null || prevColor != currColor){
          // Changing to a new color
          instructions.push(addInstruction(colorAmt, props.stitch, prevColor));
          colorAmt = 1;
          prevColor = currColor;
          // Call helper function to concat instructions
  
        } else {
          // Keep same color
          colorAmt++;
        }
  
        prevColor = currColor;
      }
      
      // add instructions for last color
      instructions.push(addInstruction(colorAmt, props.stitch, currColor));
    }

    // if curr row is max, it shouldn't add the additional chain at the start/end
    if (props.currRow < props.maxRow){
      // Turn to change sides
      instructions.push(<>Turn tapestry, </>)

      // Add an additional chain at the end (starts the next row)
      instructions.push(<>Chain 1.</>);
    }
    return instructions;

  }

  function addInstruction(amount : number, stitch : Stitch, hex : string) {
    return (
      <>
        {amount} {stitch.toUpperCase()} (
          <ColorBlock color={hex} size={15}/> {color[hex]}
        ) {""}<br/>
      </>
    )
  }

  return (
    <section>
      <h1>
        Instructions for 
        {props.currRow >= 0 ? `Row ${props.currRow + 1}` : "Foundation Chain"}
      </h1>
      {printInstructions()}
    </section>
  )
}

export default Instructions;