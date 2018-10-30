import MainContainer from './MainContainer.js'
import ContainerElement from './ContainerElement.js'
import fetchData from './fetchData.js'

// Import our json files
const data = fetchData()

const width = window.innerWidth
const height = window.innerHeight

// Initalize new 'container'. This is basically a fullscreen canvas on which
// everything will be drawn.
const container = new MainContainer(width, height)

// For every json entry, create a new 'ContainerElement'.
// These are the red squares that represent amounts of money
const elements = data.map(d => new ContainerElement(d))

container.addElements(elements)

setTimeout(() => {
  container.moveIntoFormation()
  container.addBBox()
}, 2000)
