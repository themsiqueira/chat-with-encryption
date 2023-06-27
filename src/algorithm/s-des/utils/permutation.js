const permutation = (input, permutationTable) => {
  return permutationTable.map((index) => input[index - 1]).join('')
}

module.exports = { permutation }