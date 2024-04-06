import { HEIGHT, WIDTH } from "./constants"
import { Cell, SnakeBody } from "./types"

export const getCellId = (x: number, y: number) => {
  return `cell:${x}-${y}`
} 
export const getCell = (x: number, y: number) => {
  return document.getElementById(getCellId(x, y)) as HTMLDivElement
}

type PositionDiff = {
  x: number
  y: number
}

const minMax = (value: number, min: number, max: number) => {
  if (value < min) return max
  if (value > max) return min
  return value 
}

export const calculatePosition = (snakeBody: SnakeBody, diff: PositionDiff): Cell => {
  const newX = snakeBody.x + diff.x
  const newY = snakeBody.y + diff.y

  return {
    x: minMax(newX, 0, WIDTH - 1),
    y: minMax(newY, 0, HEIGHT - 1)
  }
}

export const isSamePosition = (c1: Cell, c2: Cell) => {
  if (c1.x === c2.x && c1.y === c2.y) {
    return true
  }

  return false
}

export const getEmptyCell = (occupiedCells: Cell[]): Cell => {
  const c: Cell = {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT)
  }
  let isEmptyCell = true

  for (let i = 0; i < occupiedCells.length; i += 1) {
    const c2 = occupiedCells[i];
    if (c.x === c2.x && c.y === c2.y) {
      isEmptyCell = false;

      break;
    }
  }

  if (isEmptyCell) {
    return c
  } else {
    return getEmptyCell(occupiedCells)
  }
}
