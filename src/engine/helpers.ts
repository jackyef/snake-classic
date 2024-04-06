export const getCellId = (x: number, y: number) => {
  return `cell:${x}-${y}`
} 
export const getCell = (x: number, y: number) => {
  return document.getElementById(getCellId(x, y)) as HTMLDivElement
}
