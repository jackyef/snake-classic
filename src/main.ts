import './style.css'
import { createGameEngine } from './engine'

const engine = createGameEngine()
 
engine.init()
engine.render()

const button = document.createElement('button')
button.setAttribute('id', 'playPauseButton')
button.innerText = 'Pause'

const actionsContainer = document.createElement('div') 
actionsContainer.appendChild(button)
document.body.appendChild(actionsContainer)

button.addEventListener('click', () => {
  if (engine.isPaused()) {
    engine.resume()
    button.innerHTML = 'Pause'
  } else {
    engine.pause()
    button.innerHTML = 'Play'
  }
})
