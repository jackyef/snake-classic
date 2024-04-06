import { getCell } from "./helpers";
import { Cell, GameState, Snake } from "./types";

const renderSnake = (snake: Snake) => {
  snake.forEach(snakeBody => {
    const cell = getCell(snakeBody.x, snakeBody.y);

    cell.setAttribute('data-snake', 'true')
  })
}

const renderFood = (food: Cell) => {
  const cell = getCell(food.x, food.y);

  cell.setAttribute('data-food', 'true')
}

export const clearCell = (cell: Cell) => {
  const c = getCell(cell.x, cell.y);

  c.removeAttribute('data-snake')
  c.removeAttribute('data-food')
}

export const render = (gameState: GameState, cellsToClear?: Cell[]) => {
  if (cellsToClear) {
    cellsToClear.forEach(clearCell)
  }

  renderSnake(gameState.snake)
  renderFood(gameState.food)
}
