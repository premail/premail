'use strict';

const { mainConfig } = require('../functions/mainConfig.js');

//
// Set variable based on whether text version should be generated.
//

let text = mainConfig.data.text.generate;

module.exports = {
  text
};
