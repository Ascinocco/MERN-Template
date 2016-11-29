var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var nodemon     = require('gulp-nodemon');
var cleanCSS    = require('gulp-clean-css');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('gulp-browserify');
var del         = require('del');

var deleteCss = function(){
  del.sync(['public/css/**/*.css', '!public/css']);
};

var deleteJs = function(){
  del.sync(['public/js/**/*.js', '!public/js']);
};

var deleteImg = function(){
  del.sync(['public/img/**/*.*', '!public/img']);
};

var processCss = function(){
  return gulp.src('app/views/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
};

var processJs = function(){
  return gulp.src('app/views/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(browserify())
    .pipe(uglify())
    .pipe(concat('start.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
};

var processImg = function(){
  return gulp.src('app/views/**/*.{png,jpg,svg,gif}')
    .pipe(gulp.dest('public/img'));
};

var runCss = function(){
  deleteCss();
  processCss();
};

var runJs = function(){
  deleteJs();
  processJs();
};

var runImg = function(){
  deleteImg();
  processImg();
}

gulp.task('server', function(){
  nodemon({
    script: 'server.js',
    ext: 'js css html',
    ignore: [
      'public/**/*.*',
      'gulpfile.js',
      'docker-compose.yml',
      'package.json',
      '.gitignore',
      '.editorconfig',
      '.git',
      'README.md',
      'node_modules'
    ]
  }).on('start', function(){
    runCss();
    runJs();
    runImg();
  }).on('restart', function(){
    runCss();
    runJs();
    runImg();
  });
});

gulp.task('default', ['server']);
