type ColorBlock = {
  color : string,
  size : number
}

export default function ColorBlock(props : ColorBlock){
  return <div
  style={{
    width : props.size,
    height : props.size,
    backgroundColor : props.color,
    border : "1px solid black",
    display : "inline-block"
  }}
  >
    
  </div>
}