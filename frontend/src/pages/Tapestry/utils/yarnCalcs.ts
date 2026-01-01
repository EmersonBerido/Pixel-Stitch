// TODO: yarns 0-3, 5-7

export type Calculations = {
  sc : number,
  hdc : number,
  dc : number,
  tc : number
}

export type Stitch = "sc" | "hdc" | "dc" | "tc" ;
export type YarnSize = 0|1|2|3|4|5|6|7;

const yarn0 : Calculations = {
  sc : -1,
  hdc : -1,
  dc : -1,
  tc : -1
}
const yarn1 : Calculations = {
  sc : -1,
  hdc : -1,
  dc : -1,
  tc : -1
}
const yarn2 : Calculations = {
  sc : -1,
  hdc : -1,
  dc : -1,
  tc : -1
}
const yarn3 : Calculations = {
  sc : -1,
  hdc : -1,
  dc : -1,
  tc : -1
}
const yarn4 : Calculations = {
  sc : 2.25,
  hdc : 3.5,
  dc : 5,
  tc : 6.25
}
const yarn5 : Calculations = {
  sc : -1,
  hdc : -1,
  dc : -1,
  tc : -1
}
const yarn6 : Calculations = {
  sc : -1,
  hdc : -1,
  dc : -1,
  tc : -1
}
const yarn7 : Calculations = {
  sc : -1,
  hdc : -1,
  dc : -1,
  tc : -1
}

const yarnCalcs : Record<number, Calculations>  = {
  0: yarn0, 
  1: yarn1, 
  2: yarn2, 
  3: yarn3, 
  4: yarn4, 
  5: yarn5, 
  6: yarn6,
  7: yarn7
}

export default yarnCalcs;
