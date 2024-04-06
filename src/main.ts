import './style.css'
import { createGameEngine } from './engine'

const root = document.getElementById('app')!
const engine = createGameEngine()

engine.init()
engine.render()

const button = document.createElement('button')
button.setAttribute('id', 'playPauseButton')
button.innerText = 'Pause'

const gameUI = document.createElement('div')
gameUI.setAttribute('class', 'gameUI')
gameUI.appendChild(button)
root.appendChild(gameUI)

button.addEventListener('click', () => {
  if (engine.isPaused()) {
    engine.resume()
    button.innerHTML = 'Pause'
  } else {
    engine.pause()
    button.innerHTML = 'Play'
  }
})

const scoreDiv = document.createElement('div')
scoreDiv.innerHTML = `Score: 0`
engine.onScoreUpdate(score => {
  scoreDiv.innerHTML = `Score: ${score}`
})
gameUI.appendChild(scoreDiv)

const gameLoopDiv = document.createElement('div')
const gameLoopLabel = document.createElement('span')
gameLoopLabel.innerHTML = 'Game loop interval:'

const gameLoopIntervalInput = document.createElement('input')
gameLoopIntervalInput.setAttribute('type', 'number')
gameLoopIntervalInput.value = String(50)
gameLoopIntervalInput.addEventListener('change', () => {
  const newInterval = Number(gameLoopIntervalInput.value)

  if (newInterval) {
    engine.setLoopInterval(newInterval)
  }
})

gameLoopDiv.appendChild(gameLoopLabel)
gameLoopDiv.appendChild(gameLoopIntervalInput)
gameUI.appendChild(gameLoopDiv)
