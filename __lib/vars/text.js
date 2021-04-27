'use strict';

const { userConfig } = require('../functions/userConfig.js');

//
// Set variable based on whether text version should be generated.
//

let text = userConfig.data.text.generate;

module.exports = {
  text
};
