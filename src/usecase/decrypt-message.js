const { algorithmEnum } = require("../constants/algorithm")
const { decryptSDES } = require("../algorithm/s-des")
const { decryptRC4 } = require("../algorithm/rc4")

const decryptMessage = (message, key, algorithm) => {
  switch (algorithm) {
    case algorithmEnum.SDES:
      console.log('SDES')
      return decryptSDES(message, key)
    case algorithmEnum.RC4:
      console.log('RC4')
      return decryptRC4(message, key)
    default:
      console.log('Invalid algorithm', algorithm)
      return ''
  }
}

module.exports = decryptMessage