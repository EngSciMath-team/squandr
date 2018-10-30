export default function shuffleIndices (array) {
  let indices = array.map((val, i) => i)
  let counter = indices.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // Add to shuffledIndices
    // And swap the last element with it
    let temp = indices[counter]
    indices[counter] = indices[index]
    indices[index] = temp
  }

  return indices
}
