'use strict';

const fs         = require('fs');
const path       = require('path');
const yaml       = require('js-yaml');
const Handlebars = require("handlebars");

const { config }  = require('../functions/config.js');
const err         = require('../functions/err.js');
const paths       = require('../vars/paths.js');
const getFiles    = require('../functions/getFiles.js');
const projectPath = require('../functions/projectPath.js');
const { log }     = require('../vars/log.js');
const { msg }     = require('../vars/notifications.js');
const { debug }   = require('../vars/debug.js');

//
// Render Handlebars templates into HTML.
//

module.exports = function buildTemplates(done) {

  // Load default settings
  const settings = getFiles(paths.settings.path, paths.settings.ext);
  const settingsJSON = {}

  for(let setting of settings){
    let file = yaml.loadAll(fs.readFileSync(setting, {encoding: 'utf-8'}));
    Object.assign(settingsJSON, file[0]);
  }

  // Combine with config settings to create merge data
  const data = Object.assign({}, settingsJSON, config.json[0]);

  // Define template location
  let templatePath;

  if (paths.email.name) {
    templatePath = paths.email.path;
  } else {
    templatePath = paths.design.path;
  }

  // Designate destination
  let destDir;
  let tempDir;

  if (paths.email.name) {
    tempDir = paths.email.path + paths.email.temp;
    destDir = paths.email.path;
  } else {
    tempDir = paths.design.path + paths.design.temp;
    destDir = paths.design.path;
  }

  // Load all templates
  let templateArray = [];

  for(let template of paths.templates.array){
    templateArray.push(template);
  }

  let cssInlineFile = paths.theme.path + paths.theme.sassDir + '/' + data.css.inline;

  fs.stat(cssInlineFile, function(err, stat) {
    if (err == null) {

      // Register Handlebars partials
      let cssInline = fs.readFileSync(cssInlineFile, 'utf8');
      Handlebars.registerPartial('cssInline', cssInline);

      for(let file of templateArray){

        // Create new template
        const template = fs.readFileSync(file, 'utf8');
        const format = Handlebars.compile(template, {
          strict: true
        });

        // Insert data
        const processedTemplate = format(data);

        // Write the processed template
        const destPath = tempDir + path.relative(templatePath, file).replace(path.basename(file), '');

        if (!fs.existsSync(destPath)){
          fs.mkdirSync(destPath, { recursive: true });
        }

        fs.writeFileSync(destPath + '/' + path.basename(file), processedTemplate);

        debug('Processed template file: ' + path.basename(file));
      }

      debug(msg.b('Created temporary files at: ') + paths.design.path + paths.design.temp);

    } else if (err.code === 'ENOENT') {
      log(msg.error('Error building template files: CSS files do not exist. Run `gulp buildSass` before running this task.'));

    } else {
      log(msg.error('Error: ' + err.code));
    }
  });

  done();
}
