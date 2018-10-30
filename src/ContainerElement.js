import Konva from 'konva'

export default class {
  constructor (element) {
    this._metadata = element

    let sources = element.sources

    // If we have at least one source, which also lists an amount...
    if (sources[0] && sources[0].amount) {
      // Store the amount and allow this element to be rendered
      this._amount = sources[0].amount
      this._renderable = true

      // This will be used for the width and height
      this._dimension = Math.sqrt(this._amount)
    } else {
      // Otherwise, we set this flag to false
      this._renderable = false
    }
  }

  get x () {
    return this._rect.attrs.x
  }

  get y () {
    return this._rect.attrs.y
  }

  setPixelDimension (unitsPerPixel) {
    // This is the width/height (it's a square so they're the same) in pixels.
    // The _dimension attribute is in dollars
    this._pixelDimension = this._dimension / unitsPerPixel
  }

  createRect ([x, y]) {
    // https://konvajs.github.io/api/Konva.Rect.html
    this._rect = new Konva.Rect({
      x,
      y,
      width: this._pixelDimension,
      height: this._pixelDimension,
      fill: 'red',
      strokeWidth: 3,
      cornerRadius: 10,
      opacity: 0.5
    })
  }

  moveTo ([x, y]) {
    // https://konvajs.github.io/docs/tweens/All_Easings.html
    let tween = new Konva.Tween({
      node: this._rect,
      x,
      y,
      easing: Konva.Easings['StrongEaseOut'],
      duration: 1.5
    })

    tween.play()
  }
}
