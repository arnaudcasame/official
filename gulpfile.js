var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    concat = require('gulp-concat');

var jsSources = ['process/js/myscript.js', 'process/js/canvas.js'];


// gulp.task('js', function() {
//   return gulp.src('builds/development/js/main.js')
//     .pipe(jshint('./.jshintrc'))
//     .pipe(jshint.reporter('jshint-stylish'));
// });

gulp.task('autojs', function(){
  gulp.src(jsSources).
    pipe(concat('script.js')).
    pipe(gulp.dest('builds/development/js'));
});

gulp.task('html', function(){
	gulp.src('builds/development/*.html');
});

gulp.task('sass', function () {
    return sass('process/sass/style.scss', {
      sourcemap: true,
      style: 'expanded'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('builds/development/css'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/*.html', ['html']);
  gulp.watch(['process/sass/**/*'], ['sass']);
  gulp.watch(['process/js/**/*'], ['autojs']);
});

gulp.task('webserver', function() {
    gulp.src('builds/development/')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 1010
        }));
});

gulp.task('default', ['watch', 'html', 'autojs', 'sass','webserver']);
