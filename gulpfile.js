// this file contains all gulp tasks for development automation

var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();

gulp.task("build-scss", function(){
  return gulp.src('static/scss/**/*.scss')
         .pipe(sass())
         .on('error', notify.onError("Error: <%= error.message %>"))
         .pipe(gulp.dest('static/css'))
});

/*gulp.task('browserSync', function(){
  browserSync.init({
    server : true
  });
});*/

gulp.task('watch', ['build-scss'],function(){
  gulp.watch('static/scss/**/*.scss', ['build-scss']);
});

gulp.task('default', ['watch']);
