interface ColorCountProps {
  grid : string[][],
  crochetType? : string,
  yarnSize? : number
}
import type { Calculations, Stitch, YarnSize } from "../utils/yarnCalcs"
import yarnCalcs from "../utils/yarnCalcs"

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
    
    function Yardage(index : number){
      // Gets which stitch calculations to do
      const yarnSize : YarnSize = (Number(props.yarnSize) as YarnSize) || 4;
      const crochetType : Stitch = (props.crochetType as Stitch) || "sc";
      const lengthPerStich : number = yarnCalcs[yarnSize]?.[crochetType];

      // Calculates inches/yards needed
      const inches = lengthPerStich * colorsAmt[index]
      const yards = inches / 36;
      return <p>{`${inches} inches / ${yards.toFixed(2)} yards`}</p>

    }

    return(
      <>
        {colors.map((value, idx) => {
          return (
            <div className="flex gap-4 items-center">
              <div
                style={{
                  width : 20,
                  height : 20,
                  backgroundColor : value,
                  border : "1px solid black"
                }}
              />

              <p>{`${colorsAmt[idx]}`}</p>
              {Yardage(idx)}

            </div>
          )
        })}
      </>
    )
  }