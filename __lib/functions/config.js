'use strict';

const fs   = require('fs');
const yaml = require('js-yaml');

const { debug } = require('../vars/debug.js');
const { msg }   = require('../vars/notifications.js');

//
// Load config from YAML file.
//

const config = {};
config.json = yaml.loadAll(fs.readFileSync('./config.yaml', {encoding: 'utf-8'}));
config.data = config.json[0];
debug(msg.b('Current configuration:\n') + JSON.stringify(config.data, null, 2).replace(/[\"{},]/g, ''));

module.exports = {
  config
}
