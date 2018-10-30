import Konva from 'konva'
import shuffleIndices from './utils/shuffleIndices.js'
import Packer from './utils/Packer.js'
import getBBox from './utils/getBBox.js'

export default class {
  constructor (width, height) {
    this._width = width
    this._height = height
    this._center = [width / 2, height / 2]

    // We will use the 'Konva' library to render everything to the canvas
    this._stage = new Konva.Stage({
      container: 'container',
      width,
      height
    })
    this._rectLayer = new Konva.Layer()
    this._boundingLayer = new Konva.Layer()
    this._stage.add(this._rectLayer)
    this._stage.add(this._boundingLayer)

    this._elements = undefined
    this._maxDimension = undefined
    this._unitsPerPixel = undefined
    this._canvasFill = 0.55
  }

  addElements (elements) {
    let renderableElements = elements.filter(el => el._renderable)

    // Sort elements from large to small
    this._elements = renderableElements.sort((a, b) => b._amount - a._amount)

    // Get maximum dimension
    this._maxDimension = Math.max(renderableElements.map(el => el._dimension))

    // Calculate good number of units per pixels.
    // This part definitely needs to be refactored...
    let totalAreaPixels = this._width * this._height
    let amounts = this._elements.map(el => el._amount)
    let totalAreaUnits = amounts.reduce((a, b) => a + b, 0)

    let pixelDimension = Math.sqrt(totalAreaPixels)
    let unitDimension = Math.sqrt(totalAreaUnits)

    this._unitsPerPixel = (unitDimension / pixelDimension) * (1 / this._canvasFill)

    // We will loop over a shuffled version of the array, just for fun
    let shuffled = shuffleIndices(this._elements)

    for (let i in shuffled) {
      let index = shuffled[i]
      let element = this._elements[index]
      element.setPixelDimension(this._unitsPerPixel)
      // Give element initial position
      element.createRect(this._randomPosition(i, element))

      this._rectLayer.add(element._rect)
    }

    // Draw
    this.draw()

    // Calculate locations and dimensions after bin packing.
    let w = this._width
    let h = this._height
    let wh = Math.min(w, h)
    this._padding = 2
    let packer = new Packer(wh, this._canvasFill, this._padding)

    // The elements will be moved to these locations
    this._packedElements = packer.fit(this._elements)

    // Now, everything is still positioned in the left top. We will adjust
    // all elements to position them to the center.
    // First we will calculate the bounding box of the packed elements
    this._packedElementsBBox = getBBox(this._packedElements, this._elements)

    // Then we use that to center the elements
    this._centerElements()
  }

  draw () {
    this._rectLayer.draw()
    this._boundingLayer.draw()
  }

  // Draws the bounding box on the screen (mostly used for debugging)
  addBBox () {
    let x = this._packedElementsBBox.min[0] - this._padding
    let y = this._packedElementsBBox.min[1] - this._padding
    let width = this._packedElementsBBox.max[0] - x + this._padding
    let height = this._packedElementsBBox.max[1] - y + this._padding

    let bboxRect = new Konva.Rect({
      x,
      y,
      width,
      height,
      strokeWidth: 3,
      stroke: 'grey',
      cornerRadius: 10
    })

    this._boundingLayer.add(bboxRect)
    this._boundingLayer.draw()
  }

  // Moves the elements from their random positions to their box-packed positions
  moveIntoFormation () {
    for (let i in this._elements) {
      let element = this._elements[i]
      element.moveTo(this._packedElements[i])
    }
  }

  // This generates a random position within one of the four quadrants of the
  // container. This way, we add some randomness, but everything will still be
  // somewhat spread out
  _randomPosition (i, element) {
    let dimension = element._pixelDimension
    let centerWidth = this._center[0] - dimension
    let centerHeight = this._center[1] - dimension
    let allowedWidth = this._width - dimension
    let allowedHeight = this._height - dimension

    let quadrants = [
      { x: [0, centerWidth], y: [0, centerHeight] }, // lt
      { x: [this._center[0], allowedWidth], y: [0, centerHeight] }, // rt
      { x: [0, centerWidth], y: [this._center[1], allowedHeight] }, // lb
      { x: [this._center[0], allowedWidth], y: [this._center[1], allowedHeight] } // rb
    ]

    let quadrantIndex = i - (Math.floor(i / 4) * 4)

    let quadrant = quadrants[quadrantIndex]

    let randomX = quadrant.x[0] + (Math.random() * (quadrant.x[1] - quadrant.x[0]))
    let randomY = quadrant.y[0] + (Math.random() * (quadrant.y[1] - quadrant.y[0]))

    return [randomX, randomY]
  }

  // Moves every element a certain number of pixels to make sure the bounding
  // box of all elements in centered
  _centerElements () {
    let w = this._packedElementsBBox.max[0] - this._packedElementsBBox.min[0]
    let h = this._packedElementsBBox.max[1] - this._packedElementsBBox.min[1]

    let left = (this._width - w) / 2
    let top = (this._height - h) / 2

    // Transpose packedElements
    this._packedElements = this._packedElements.map(element => {
      element[0] += left
      element[1] += top

      return element
    })

    // Transpose BBox itself
    this._packedElementsBBox.min[0] += left
    this._packedElementsBBox.min[1] += top
    this._packedElementsBBox.max[0] += left
    this._packedElementsBBox.max[1] += top
  }
}
