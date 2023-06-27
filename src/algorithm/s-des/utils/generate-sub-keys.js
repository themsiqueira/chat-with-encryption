const { P10, LS1, P8 } = require('../../../constants/s-des');
const { permutation } = require('./permutation');
const { leftCircularShift } = require('./left-circular-shift');

const generateSubkeys = (key) => {
  // Aplicar permutação P10
  const p10Key = permutation(key, P10);

  // Dividir em duas partes de 5 bits cada
  const leftPart = p10Key.slice(0, 5);
  const rightPart = p10Key.slice(5);

  // Realizar rotação circular à esquerda em ambas as partes
  const shiftedLeftPart = leftCircularShift(leftPart, LS1);
  const shiftedRightPart = leftCircularShift(rightPart, LS1);

  // Juntar as partes e aplicar permutação P8 para gerar a primeira subchave
  const subkey1 = permutation(shiftedLeftPart + shiftedRightPart, P8);

  // Realizar segunda rotação circular à esquerda
  const shiftedLeftPart2 = leftCircularShift(shiftedLeftPart, LS1);
  const shiftedRightPart2 = leftCircularShift(shiftedRightPart, LS1);

  // Juntar as partes e aplicar permutação P8 para gerar a segunda subchave
  const subkey2 = permutation(shiftedLeftPart2 + shiftedRightPart2, P8);

  return [subkey1, subkey2];
}

module.exports = { generateSubkeys }