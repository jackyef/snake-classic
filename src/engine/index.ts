import { calculatePosition, getEmptyCell, isSamePosition } from './helpers'
import { init as _init } from './init'
import { render as _render, clearCell } from './renderer'
import { Cell, GameState, SnakeBody } from './types'

export const createGameEngine = () => {
  let isPaused = false
  let gameState: GameState

  const init = () => {
    gameState = _init()

    document.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowUp':
          if (gameState.snakeDirection !== 'down') {
            gameState.snakeDirection = 'up';
          }
          break;
        case 'ArrowDown':
          if (gameState.snakeDirection !== 'up') {
            gameState.snakeDirection = 'down';
          }
          break;
        case 'ArrowLeft':
          if (gameState.snakeDirection !== 'right') {
            gameState.snakeDirection = 'left';
          }
          break;
        case 'ArrowRight':
          if (gameState.snakeDirection !== 'left') {
            gameState.snakeDirection = 'right';
          }
          break;
      }
    })

    tick()
  }

  const render = (cellsToClear?: Cell[]) => {
    _render(gameState, cellsToClear)
  }

  const updateGameState = () => {
    const toClear: Cell[] = []

    const head = gameState.snake[0]
    let newPosition: SnakeBody

    switch (gameState.snakeDirection) {
      case 'up':
        newPosition = calculatePosition(head, { x: 0, y: -1 })
        break;
      case 'down':
        newPosition = calculatePosition(head, { x: 0, y: 1 })
        break;
      case 'left':
        newPosition = calculatePosition(head, { x: -1, y: 0 })
        break;
      case 'right':
        newPosition = calculatePosition(head, { x: 1, y: 0 })
        break;
      default:
        // Should never happen
        newPosition = head
        break;
    }

    if (isSamePosition(newPosition, gameState.food)) {
      gameState.snake.unshift(newPosition)
      clearCell(gameState.food)
      gameState.food = getEmptyCell(gameState.snake)
    } else {
      const tail = gameState.snake.pop()

      if (tail) {
        toClear.push(tail)
      }
      gameState.snake.unshift(newPosition)
    }

    return toClear
  }

  const tick = () => {
    if (!isPaused) {
      setTimeout(() => {
        const cellsToClear = updateGameState()
        render(cellsToClear)
        tick()
      }, 200)
    }
  }

  return {
    init,
    render,
    pause: () => isPaused = true,
    resume: () => {
      isPaused = false,
        tick()
    },
    isPaused: () => isPaused
  }
}
