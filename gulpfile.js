const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')

function compileSass() {
  return gulp.src('src/morkovka.scss')
    .pipe(plumber({
      errorHandler(error) {
        console.log(error.message)
        this.emit('end')
      }
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('dist'))
}
exports.compileSass = compileSass

function serve() {
  gulp.watch(
    ['src/common/**/*.scss', 'src/blocks/**/*.scss'],
    { events: [ 'add', 'change', 'unlink' ], delay: 150 },
    gulp.series(compileSass)
  )
}
exports.serve = serve

exports.default = gulp.series(
  compileSass,
  serve
)