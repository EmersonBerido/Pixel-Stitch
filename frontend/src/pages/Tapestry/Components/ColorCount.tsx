interface ColorCountProps {
  grid : string[][],
  stitch? : string,
  yarnSize? : number
}
import type { Stitch, YarnSize } from "../utils/yarnCalcs"
import yarnCalcs from "../utils/yarnCalcs"

const defaultYarnSize : YarnSize = 4;
const defaultStitch : Stitch = "sc"
import ColorBlock from "./ColorBlock";

export default function ColorCount(props : ColorCountProps){
    const colors : string[] = []
    const colorsAmt : number[] = []

    // Records each color's frequency
    props.grid.map(row =>
      row.map(pixel =>{
        const colorIdx = colors.indexOf(pixel)
        if (colorIdx >= 0){
          colorsAmt[colorIdx] += 1
        }
        else {
          colors.push(pixel);
          colorsAmt.push(1);
        }
      })
    )
    
    function Yardage(colorIdx : number){
      // Gets which stitch calculations to do
      const yarnSize : YarnSize = (Number(props.yarnSize) as YarnSize) || defaultYarnSize;
      const stitch : Stitch = (props.stitch as Stitch) || defaultStitch;
      const lengthPerStich : number = yarnCalcs[yarnSize]?.[stitch];

      // Calculates inches/yards needed
      const inches = lengthPerStich * colorsAmt[colorIdx]
      const yards = inches / 36;

      return <p>{`${inches} inches / ${yards.toFixed(2)} yards`}</p>

    }

    return(
      <>
        {colors.map((value, idx) => {
          return (
            <div className="flex gap-4 items-center">
              <ColorBlock color={value} size={20}/>

              <p>{`${colorsAmt[idx]}`}</p>
              {Yardage(idx)}

            </div>
          )
        })}
      </>
    )
  }