import { calculatePosition, getEmptyCell, getInitialGameState, isSamePosition } from './helpers'
import { init as _init } from './init'
import { render as _render, clearCell } from './renderer'
import { Cell, GameState, SnakeBody } from './types'

type OnScoreUpdateCallback = (score: number) => void

export const createGameEngine = () => {
  let isPaused = false
  let gameState: GameState
  let _interval = 50
  let _onScoreUpdateCallback: OnScoreUpdateCallback

  const init = () => {
    gameState = _init()

    document.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          if (gameState.snakeDirection !== 'down') {
            gameState.snakeDirection = 'up';
          }
          break;
        case 'ArrowDown':
          e.preventDefault()
          if (gameState.snakeDirection !== 'up') {
            gameState.snakeDirection = 'down';
          }
          break;
        case 'ArrowLeft':
          e.preventDefault()
          if (gameState.snakeDirection !== 'right') {
            gameState.snakeDirection = 'left';
          }
          break;
        case 'ArrowRight':
          e.preventDefault()
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

  const reset = () => {
    gameState.snake.forEach(clearCell)
    clearCell(gameState.food)

    _onScoreUpdateCallback(0)
    gameState = getInitialGameState()
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
      gameState.score += 1;
      _onScoreUpdateCallback(gameState.score)
    } else if (gameState.snake.some((s) => isSamePosition(s, newPosition))) {
      // Check if colliding with body
      alert('Game over!');

      reset()
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
      }, _interval)
    }
  }

  const onScoreUpdate = (callback: OnScoreUpdateCallback) => {
    _onScoreUpdateCallback = callback
  }

  return {
    init,
    render,
    setLoopInterval: (newInterval: number) => _interval = newInterval,
    pause: () => isPaused = true,
    resume: () => {
      isPaused = false,
        tick()
    },
    isPaused: () => isPaused,
    onScoreUpdate
  }
}
