const { encryptRC4 } = require("../algorithm/rc4")
const { encryptSDES } = require("../algorithm/s-des")
const { algorithmEnum } = require("../constants/algorithm")

const encryptMessage = (message, key, algorithm) => {
  switch (algorithm) {
    case algorithmEnum.SDES:
      return encryptSDES(message, key)
    case algorithmEnum.RC4:
      return encryptRC4(message, key)
    default:
      console.log('Invalid algorithm')
      return ''
  }
}

module.exports = encryptMessage