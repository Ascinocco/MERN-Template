var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('gulp-browserify');
var uglify      = require('gulp-uglify');
var cleanCSS    = require('gulp-clean-css');
var sourcemaps  = require('gulp-sourcemaps');
var del         = require('del');

// --------------------- Delete CSS and JS ------------------------------
gulp.task('del-js', function(){
  del.sync(['public/js/**/*.js', '!public/js']);
});

gulp.task('del-css', function(){
  del.sync(['public/css/**/*.css', '!public/css']);
});
// ----------------------------------------------------------------------

// --------------- Tasks to run against js and css ----------------------
// grab all client side js and put it into pub dir
gulp.task('js', ['del-js'], function(){
  return gulp.src('app/views/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(browserify())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

// css and put it into pub dir
gulp.task('css', ['del-css'], function(){
  return gulp.src('app/views/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
});
// -----------------------------------------------------------------------

// ------------------ Browser Sync watchers ------------------------------
// make sure js processing is complete before reloading browser
gulp.task('js-watch', ['js'], function(done){
  browserSync.reload();
  done();
});


//make sure css processing us complete before reloading browserify
gulp.task('css-watch', ['css'], function(done){
  browserSync.reload();
  done();
});
// -----------------------------------------------------------------------

// run watchers
gulp.task('default', ['js', 'css'], function(){
  gulp.watch("app/views/**/*.js", ['js-watch']);
  gulp.watch("app/views/**/*.css", ['css-watch']);
});
