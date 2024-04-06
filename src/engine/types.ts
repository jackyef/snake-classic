export type Snake = Array<SnakeBody>
export type SnakeBody = {
  x: number
  y: number
}

export type Cell = {
  x: number
  y: number
}
export type CellState = 'Snake' | 'Food' | null
export type GameMap = Array<Array<CellState>>

export type GameState = {
  snake: Snake
  food: Cell
  snakeDirection: 'up' | 'down' | 'left' | 'right'
}
