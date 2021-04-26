'use strict';

const fs   = require('fs');
const yaml = require('js-yaml');

const { debug }   = require('../vars/debug.js');
const { msg }     = require('../vars/notifications.js');
const paths       = require('../vars/paths.js');
const projectPath = require('../functions/projectPath.js');
const getFiles    = require('../functions/getFiles.js');

//
// Load internal config from ./__lib/config directory.
//

const internalConfig = {};
internalConfig.dir  = projectPath(__dirname, '../../__lib/config');
internalConfig.list = getFiles(internalConfig.dir, 'yaml');
internalConfig.json = {}

for(let setting of internalConfig.list){
  let file = yaml.loadAll(fs.readFileSync(setting, {encoding: 'utf-8'}));
  Object.assign(internalConfig.json, file[0]);
}

// Done just to keep naming consistent with other config modules.
internalConfig.data = internalConfig.json;

// Uncomment the following line to see internal configuration on debug commands.
// debug(msg.b('Internal configuration:\n') + JSON.stringify(internalConfig.json, null, 2).replace(/[\"{},]/g, ''));

module.exports = {
  internalConfig
}
