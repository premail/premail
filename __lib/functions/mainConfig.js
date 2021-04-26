'use strict';

const fs   = require('fs');
const yaml = require('js-yaml');

const { debug } = require('../vars/debug.js');
const { msg }   = require('../vars/notifications.js');

//
// Load config from YAML file.
//

const mainConfig = {};
mainConfig.json = yaml.loadAll(fs.readFileSync('./config.yaml', {encoding: 'utf-8'}));
mainConfig.data = mainConfig.json[0];
debug(msg.b('Current configuration:\n') + JSON.stringify(mainConfig.data, null, 2).replace(/[\"{},]/g, ''));

module.exports = {
  mainConfig
}
