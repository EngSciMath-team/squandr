export default function (elementPositions, elementDimensions) {
  let min = [Infinity, Infinity]
  let max = [-Infinity, -Infinity]

  for (let i = 0; i < elementPositions.length; ++i) {
    let el = elementPositions[i]

    if (min[0] > el[0]) { min[0] = el[0] }
    if (min[1] > el[1]) { min[1] = el[1] }

    let wh = elementDimensions[i]._pixelDimension

    if (max[0] < el[0] + wh) { max[0] = el[0] + wh }
    if (max[1] < el[1] + wh) { max[1] = el[1] + wh }
  }

  return { min, max }
}
