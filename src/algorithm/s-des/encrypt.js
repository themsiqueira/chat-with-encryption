const { sdes } = require('./base-s-des');

const encrypt = (plaintext, key) => {
  sdes(plaintext, key, true)
}

module.exports = { encrypt }