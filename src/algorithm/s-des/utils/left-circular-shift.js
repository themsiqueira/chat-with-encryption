const leftCircularShift = (input, shift) => {
  return input.slice(shift) + input.slice(0, shift)
}

module.exports = { leftCircularShift }