const { src, dest, watch } = require("gulp");
const rename = require('gulp-rename')
const mjml = require('gulp-mjml')
const mjmlEngine = require('mjml')

const paths = {
  mjml: {
    src: './**/index.mjml',
    dir: '/dist/',
    dest: '.'
  }
};

// MJML -> HTML: Pretty version
function html_pretty() {
  return src(paths.mjml.src)
    .pipe(mjml(mjmlEngine, {
      beautify: true
    }))
    .on('error', e => console.log(e))
    .pipe(rename(function(path) {
      path.dirname = path.dirname + paths.mjml.dir;
      return path;
    }))
    .pipe(dest(paths.mjml.dest))
}
exports.html_pretty = html_pretty;

// MJML -> HTML: Production version
function html_prod() {
  return src(paths.mjml.src)
    .pipe(mjml(mjmlEngine, {
      beautify: false,
      minify: true,
      keepComments: false
    }))
    .on('error', e => console.log(e))
    .pipe(rename(function(path) {
      path.dirname = path.dirname + paths.mjml.dir;
      return path;
    }))
    .pipe(dest(paths.mjml.dest))
}
exports.html_prod = html_prod;

// Export for production
exports.export = async function () {
  html_prod();
}

// Watch
exports.watch = function () {
  watch("./**/*.mjml", html_pretty);
}

// Gulp default
exports.default = html_pretty;
