'use strict';

const { config } = require('../functions/config.js');

//
// Set variable based on whether text version should be generated.
//

let text = config.text.generate;

module.exports = {
  text
};
