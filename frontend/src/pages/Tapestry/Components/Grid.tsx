type GridProps = {
  grid : string[][],
  size : number
}
export default function Grid(props : GridProps) {
  return props.grid && (
    <div
        style={{
          display: "grid",
          gridTemplateColumns : `repeat(${props.grid[0] ? props.grid[0].length : 0}, ${props.size}px)`,
          userSelect: "none"
        }}
      >
        {
          props.grid.map((row, r) =>
            row.map((pixel, c) => (
              <div
                key={`${r}-${c}`}
                style={{
                  width : props.size,
                  height : props.size,
                  border : `${props.size > 10 ? 0.5 : 0}px solid grey`,
                  background : pixel
                }}
              />
            ))
          )
        }
      </div>
  ) 
}