'use strict';

const del = require('del');

const paths    = require('../vars/paths.js');
const { log }  = require('../vars/log.js');
const { msg }  = require('../vars/notifications.js');
const { debug } = require('../vars/debug.js');

//
// Clean generated files and directories.
//

function clean(done) {
  log(msg.warn('Deleting generated files...'))

  const deletedFilePaths = [
    paths.designDistDir + '/*',
    paths.sassDir + '*.css'
  ];

  del.sync(deletedFilePaths);

  log(debug(deletedFilePaths.join('\n')));

  done();
}

module.exports = {
  clean
}
