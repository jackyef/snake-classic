import { init as _init } from './init'
import { render as _render } from './renderer'
import { GameState } from './types'

export const createGameEngine = () => {
  let gameState: GameState

  const init = () => {
    gameState = _init()
  }

  const render = () => {
    _render(gameState.snake)
  }

  return {
    init,
    render
  }
}
