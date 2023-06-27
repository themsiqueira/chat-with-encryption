const { sdes } = require("./base-s-des");

const decrypt = (ciphertext, key) => {
 return sdes(ciphertext, key, false)
}

module.exports = { decrypt }