import { HEIGHT, WIDTH } from "./constants"
import { SnakeBody } from "./types"

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

export const calculatePosition = (snakeBody: SnakeBody, diff: PositionDiff) => {
  const newX = snakeBody.x + diff.x
  const newY = snakeBody.y + diff.y

  return {
    x: minMax(newX, 0, WIDTH - 1),
    y: minMax(newY, 0, HEIGHT - 1)
  }
}
