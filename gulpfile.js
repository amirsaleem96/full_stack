// this file contains all gulp tasks for development automation

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

gulp.task("test", function(){
  console.log("test task is running successfully");
});

gulp.task("build-scss", function(){
  return gulp.src('static/scss/**/*.scss')
         .pipe(sass())
         .pipe(gulp.dest('static/css'))
         .pipe(browserSync.reload({
           stream : true,
           done : true
         }))
});

gulp.task('browserSync', function(){
  browserSync.init({
    server : {
      baseDir : './views'
    }
  });
});

gulp.task('watch', ['browserSync', 'build-scss'] ,function(){
  gulp.watch('static/scss/**/*.scss', ['build-scss']);
});
