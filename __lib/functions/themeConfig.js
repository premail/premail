'use strict';

const fs   = require('fs');
const yaml = require('js-yaml');

const { debug } = require('../vars/debug.js');
const { msg }   = require('../vars/notifications.js');
const { log }   = require('../vars/log.js');
const paths     = require('../vars/paths.js');

//
// Load theme config from YAML file.
//

const themeConfig = {};
themeConfig.json = yaml.loadAll(fs.readFileSync(paths.theme.path + '/themeConfig.yaml', {encoding: 'utf-8'}));
themeConfig.data = themeConfig.json[0];
debug(msg.b('Design configuration:\n') + JSON.stringify(themeConfig.data, null, 2).replace(/[\"{},\[\]]/g, ''));

//
// Construct additional variables dependent on theme config.
//

// Web font
if ((themeConfig.data.fonts.options.google.enabled) || (themeConfig.data.fonts.options.custom.enabled)) {
  themeConfig.data.fonts.web = true;
}

// Google Font URI
// encodeURI()
if (themeConfig.data.fonts.options.google.enabled) {

  let weights = [];
  for(let weight of themeConfig.data.fonts.options.google.weights){
    weights.push(weight);
  }

  let specs = '';

  if (themeConfig.data.fonts.options.google.italics) {
    for(let weight of weights){
      weight = '0,' + weight;
      weights.push(weight);
    }
    specs = 'ital,wght@' + weights.reduce( (s,x,i) => s+(i>0 ? ';' : '') + (x==null ? '' : x), '');
    log(specs);

  } else {
    specs = 'wght@' + weights.reduce( (s,x,i) => s+(i>0 ? ';' : '') + (x==null ? '' : x), '');
    log(specs);
  }

  themeConfig.data.fonts.options.google.href =
    'https://fonts.googleapis.com/css2?family=' +
    themeConfig.data.fonts.options.google.name.replace(/\s/g, '+') +
    ':' + specs + '&amp;display=swap';
}

// One weight:
// <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@700&display=swap" rel="stylesheet">
// Two weights:
// <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
// One weight and italics:
// <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
// Two weights and italics:
// <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,700;1,300;1,700&display=swap" rel="stylesheet">

module.exports = {
  themeConfig
}
