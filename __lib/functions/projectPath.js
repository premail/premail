'use strict';

//
// arg(): Resolve a path relative to the root project directory.
//
// `INIT_CWD` is an environmental variable provided by Gulp that always resolves
// to the project root directory. Combining it with `path.resolve()` will return
// an absolute path.
//
// Source:
// https://github.com/vigetlabs/blendid/blob/master/gulpfile.js/lib/projectPath.js
//

// Requirements
const path = require('path');

// Function
module.exports = function projectPath(...paths) {
  return path.resolve(process.env.INIT_CWD, ...paths);
}
