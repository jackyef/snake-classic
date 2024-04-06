import { calculatePosition } from './helpers'
import { init as _init } from './init'
import { render as _render } from './renderer'
import { Cell, GameState, SnakeBody } from './types'

export const createGameEngine = () => {
  let isPaused = false
  let gameState: GameState

  const init = () => {
    gameState = _init()

    // document.addEventListener('keydown', e => {
    //   switch (e.key) {
    //     case 'ArrowUp':
    //     case 'ArrowDown':
    //     case 'ArrowLeft':
    //     case 'ArrowRight':
    //   }
    // })

    tick()
  }

  const render = (cellsToClear?: Cell[]) => {
    _render(gameState.snake, cellsToClear)
  }

  const updateGameState = () => {
    // Update snake bodies
    let tail = gameState.snake.pop()
    const toClear: Cell[] = []

    if (!tail) return

    const head = gameState.snake[0]
    let newTailPosition: SnakeBody

    switch (gameState.snakeDirection) {
      case 'up':
        newTailPosition = calculatePosition(head, { x: 0, y: -1 })
        break;
      case 'down':
        newTailPosition = calculatePosition(head, { x: 0, y: 1 })
        break;
      case 'left':
        newTailPosition = calculatePosition(head, { x: -1, y: 0 })
        break;
      case 'right':
        newTailPosition = calculatePosition(head, { x: 1, y: 0 })
        break;
      default:
        newTailPosition = tail
        break;
    }

    toClear.push(tail)
    tail = newTailPosition
    gameState.snake.unshift(tail)

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
