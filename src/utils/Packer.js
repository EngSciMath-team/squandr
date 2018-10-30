// https://stackoverflow.com/questions/21078959/an-approach-to-implement-rectangular-bin-packing/21079042#21079042
export default class {
  constructor (wh, multiplier, padding) {
    this.containerWH = wh
    this.multiplier = multiplier
    this.padding = padding

    this.setRoot()
  }

  setRoot () {
    let x = 0
    let y = 0
    let w = this.containerWH * this.multiplier
    let h = w
    this.root = { x, y, w, h }
  }

  fit (elements) {
    let fitted = this.pack(elements)
    // TODO: binary search instead of brute force
    while (this.containsEmptyValues(fitted, elements) && this.multiplier < 1) {
      this.multiplier += 0.01
      this.setRoot()

      fitted = this.pack(elements)
    }

    return fitted
  }

  containsEmptyValues (fittedValues, elements) {
    if (fittedValues.length < elements.length) { return true }
    for (let entry of fittedValues) {
      if (entry === undefined) { return true }
    }
    return false
  }

  pack (elements) {
    let fitted = []
    for (let i in elements) {
      let element = elements[i]
      let wh = element._pixelDimension + this.padding * 2
      let node = this.findNode(this.root, wh)
      if (node) {
        let result = this.splitNode(node, wh)
        fitted[i] = [result.x + this.padding, result.y + this.padding]
      }
    }

    return fitted
  }

  findNode (root, wh) {
    if (root.used) {
      return this.findNode(root.right, wh) || this.findNode(root.down, wh)
    } else if ((wh <= root.w) && wh <= root.h) {
      return root
    } else {
      return null
    }
  }

  splitNode (node, wh) {
    node.used = true
    node.down = { x: node.x, y: node.y + wh, w: node.w, h: node.h - wh }
    node.right = { x: node.x + wh, y: node.y, w: node.w - wh, h: wh }
    return node
  }
}
