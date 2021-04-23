'use strict';

const fs   = require('fs');
const yaml = require('js-yaml');

//
// Load config from YAML file.
//

const config = {};
config.json = yaml.loadAll(fs.readFileSync('./config.yaml', {encoding: 'utf-8'}));
config.data = config.json[0];

module.exports = {
  config
}
