'use strict';

const del = require('del');

const paths     = require('../vars/paths.js');
const { log }   = require('../vars/log.js');
const { msg }   = require('../vars/notifications.js');
const { debug } = require('../vars/debug.js');

//
// Clean generated files and directories.
//

module.exports = function clean(done) {
  log(msg.warn('Deleting generated files...'))

  const deletedFilePaths = [
    paths.design.dist + '/*',
    paths.theme.path + '/sass/*.css'
  ];

  del.sync(deletedFilePaths);

  log(debug(deletedFilePaths.join('\n')));

  done();
}
