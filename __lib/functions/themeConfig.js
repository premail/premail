'use strict';

const fs   = require('fs');
const yaml = require('js-yaml');

const { debug } = require('../vars/debug.js');
const { msg }   = require('../vars/notifications.js');
const paths     = require('../vars/paths.js');

//
// Load theme config from YAML file.
//

const themeConfig = {};
themeConfig.json = yaml.loadAll(fs.readFileSync(paths.theme.path + '/themeConfig.yaml', {encoding: 'utf-8'}));
themeConfig.data = themeConfig.json[0];
debug(msg.b('Design configuration:\n') + JSON.stringify(themeConfig.data, null, 2).replace(/[\"{},\[\]]/g, ''));

module.exports = {
  themeConfig
}
