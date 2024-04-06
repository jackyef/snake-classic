import { getCellId } from "./helpers"
import { GameMap, GameState, Snake } from "./types"

const root = document.querySelector<HTMLDivElement>('#app')
const WIDTH = 30
const HEIGHT = 18

// Map size: 30 x 18
export const init = (): GameState => {
  const container = document.createElement('div')
  container.setAttribute('id', 'container')
  
  const map = Array.from({ length: HEIGHT }).fill(
    Array.from({ length: WIDTH }).fill('')
  ) as GameMap

  map.forEach((cellRow, y) => {
    cellRow.forEach((_, x) => {
      const div = document.createElement('div');

      div.setAttribute('class', 'cell')
      div.setAttribute('id', getCellId(x, y))

      container.appendChild(div)
    })
  })

  const initialHeadPosition = {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT) 
  }

  const snake: Snake = []
  snake.push(initialHeadPosition)
  snake.push({
    ...initialHeadPosition,
    y: initialHeadPosition.y + 1
  })

  root!.appendChild(container)

  return {
    snake
  }
}
