var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var imagemin    = require('gulp-imagemin');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var del         = require('del');

// --------------------- Delete CSS and JS ------------------------------
gulp.task('del-js', function(){
  del.sync(['public/js/**/*.js', '!public/js']);
});

gulp.task('del-css', function(){
  del.sync(['public/css/**/*.css', '!public/css']);
});

gulp.task('del-img', function(){
  del.sync(['public/img/**/*.*', '!public/img']);
});
// ----------------------------------------------------------------------

// --------------- Tasks to run against js and css ----------------------
// grab all client side js and put it into pub dir
gulp.task('js', ['del-js'], function(){
  return gulp.src('app/views/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(browserify())
    .pipe(uglify())
    .pipe(concat('start.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

// css and put it into pub dir
gulp.task('css', ['del-css'], function(){
  return gulp.src('app/views/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
});

// optimize images and output them to public
gulp.task('img', ['del-img'], function(){
  return gulp.src('app/views/**/*.{png, jpeg, gif, svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'));
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

// reload browser with new images
gulp.task('img-watch', ['img'], function(done){
  browserSync.reload();
  done();
});
// -----------------------------------------------------------------------

// run watchers
gulp.task('default', ['js', 'css', 'img'], function(){
  gulp.watch("app/views/**/*.js", ['js-watch']);
  gulp.watch("app/views/**/*.css", ['css-watch']);
  gulp.watch("app/views/**/*.{png,jpeg, gif, svg}", ['img-watch']);
});
