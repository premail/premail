'use strict'

const { userConfig } = require('../functions/userConfig.js')

//
// Set variable based on whether text version should be generated.
//

const text = userConfig.data.text.generate

module.exports = {
  text
}
