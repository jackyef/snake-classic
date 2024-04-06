import { getCell } from "./helpers";
import { Cell, Snake } from "./types";

const renderSnake = (snake: Snake) => {
  snake.forEach(snakeBody => {
    const cell = getCell(snakeBody.x, snakeBody.y);

    cell.setAttribute('data-snake', 'true')
  })
}

export const clearCell = (cell: Cell) => {
  const c = getCell(cell.x, cell.y);

  c.removeAttribute('data-snake')
}

export const render = (snake: Snake, cellsToClear?: Cell[]) => {
  if (cellsToClear) {
    cellsToClear.forEach(clearCell)
  }
  renderSnake(snake)
}
