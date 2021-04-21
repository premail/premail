'use strict';

const PluginError = require('plugin-error');
const sass        = require('gulp-sass');

const { log } = require('../vars/log.js');
const { msg } = require('../vars/notifications.js');

//
// Set up error handling.
//

function handleError(err) {
  log(msg.error(err));
  this.emit('end');
}

// Sprucing up sass.logError
const sassError = function logError(error) {
  const message = new PluginError('gulp-sass', error.messageFormatted).toString();
  log(msg.error('\nSass processing error'));
  log(`${message}\n`);
  this.emit('end');
};

module.exports = {
  handleError,
  sassError
}
