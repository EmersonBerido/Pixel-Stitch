// Types
export type Stitch = "sc" | "hdc" | "dc" | "tc" ;
export type YarnSize = 0|1|2|3|4|5|6|7;
export type Calculations = {
  sc : number,
  hdc : number,
  dc : number,
  tc : number
}

// Personal Research
const yarn0 : Calculations = {
  sc : 0.75,
  hdc : 1.25,
  dc : 2.75,
  tc : 4.25
}
const yarn1 : Calculations = {
  sc : 1,
  hdc : 1.5,
  dc : 3.25,
  tc : 4.75
}
const yarn2 : Calculations = {
  sc : 1.25,
  hdc : 1.75,
  dc : 3.75,
  tc : 5.25
}
const yarn3 : Calculations = {
  sc : 2,
  hdc : 2.25,
  dc : 4.25,
  tc : 5.25
}
const yarn4 : Calculations = {
  sc : 2.25,
  hdc : 3.5,
  dc : 5,
  tc : 6.25
}
const yarn5 : Calculations = {
  sc : 2.4,
  hdc : 3.5,
  dc : 5,
  tc : 7.25
}
const yarn6 : Calculations = {
  sc : 2.6,
  hdc : 3.5,
  dc : 5,
  tc : 8
}
const yarn7 : Calculations = {
  sc : 4.5,
  hdc : 6,
  dc : 7.75,
  tc : 10.75
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
