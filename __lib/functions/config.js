'use strict';

const fs   = require('fs');
const yaml = require('js-yaml');

//
// Load config
//

const configJSON = yaml.loadAll(fs.readFileSync('./config.yaml', {encoding: 'utf-8'}));
const config = configJSON[0];

module.exports = {
  config
}
