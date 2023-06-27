const { sBox2, sBox1, EP, IP, P4, IPInverse } = require("../../constants/s-des");
const { generateSubkeys } = require('./utils/generate-sub-keys');
const { permutation } = require('./utils/permutation');
const { xor } = require('./utils/xor');

const sdes = (ciphertext, key, encrypt = true) => {
  // Gerar as subchaves
  const [subkeyOne, subkeyTwo] = generateSubkeys(key);

  const selectedSubkey = encrypt ? subkeyOne : subkeyTwo

  // Aplicar permutação inicial (IP)
  const ipText = permutation(ciphertext, IP);

  // Dividir em duas partes de 4 bits cada
  const leftPart = ipText.slice(0, 4);
  const rightPart = ipText.slice(4);

  // Expandir a parte direita para 8 bits usando permutação EP
  const expandedRightPart = permutation(rightPart, EP);

  // Realizar operação XOR entre a parte expandida e a segunda subchave
  const xorResult1 = xor(expandedRightPart, selectedSubkey);

  // Dividir em duas partes de 4 bits cada
  const xorLeftPart1 = xorResult1.slice(0, 4);
  const xorRightPart1 = xorResult1.slice(4);

  // Realizar substituição S-Box 1
  const sBox1Row = parseInt(xorLeftPart1[0] + xorLeftPart1[3], 2) || 0;
  const sBox1Col = parseInt(xorLeftPart1[1] + xorLeftPart1[2], 2) || 0;
  const sBox1Result = sBox1[sBox1Row][sBox1Col];

  // Realizar substituição S-Box 2
  const sBox2Row = parseInt(xorRightPart1[0] + xorRightPart1[3], 2) || 0;
  const sBox2Col = parseInt(xorRightPart1[1] + xorRightPart1[2], 2) || 0;
  const sBox2Result = sBox2[sBox2Row][sBox2Col];

  // Combinar os resultados dos S-Boxes
  const combinedSBoxes = sBox1Result + sBox2Result;

  // Aplicar permutação P4
  const p4Result = permutation(combinedSBoxes, P4);

  // Realizar operação XOR entre a parte esquerda e o resultado de P4
  const xorResult2 = xor(leftPart, p4Result);

  // Combinar as partes esquerda e direita
  const combinedXorResults = xorResult2 + rightPart;

  // Aplicar permutação inversa (IP^-1)
  return permutation(combinedXorResults, IPInverse);
}

module.exports = { sdes }
