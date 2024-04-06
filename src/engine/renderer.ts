import { getCell } from "./helpers";
import { Snake } from "./types";

const renderSnake = (snake: Snake) => {
  snake.forEach(snakeBody => {
    const cell = getCell(snakeBody.x, snakeBody.y);

    cell.setAttribute('data-snake', 'true')
  })
}

export const render = (snake: Snake) => {
  renderSnake(snake)
}
