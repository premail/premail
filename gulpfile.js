const gulp = require('gulp')
const rename = require('gulp-rename')
const mjml = require('gulp-mjml')

const paths = {
  mjml: {
    src: './**/index.mjml',
    dir: '/dist/',
    dest: '.'
  }
};

gulp.task('default', function () {
  return gulp.src(paths.mjml.src)
    .pipe(mjml())
    .pipe(rename(function(path) {
      path.dirname = path.dirname + paths.mjml.dir;
      return path;
    }))
    .pipe(gulp.dest(paths.mjml.dest))
});
