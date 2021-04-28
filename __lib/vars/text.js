'use strict'

/* eslint-disable no-unused-vars */
const { userConfig } = require('../functions/userConfig.js')
/* eslint-enable no-unused-vars */

//
// Set variable based on whether text version should be generated.
//

const text = userConfig.data.text.generate

module.exports = {
  text,
}
