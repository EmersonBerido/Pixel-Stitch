import nearestColor from "nearest-color";
import {colornames} from "color-name-list";

const colorList = nearestColor.from(
    Object.fromEntries(colornames.map(
      color  => [color.name, color.hex]
    )));


export function HexToName(hex : string) {
  const color = colorList(hex);

  if (color) return color.name;
  return null;
}