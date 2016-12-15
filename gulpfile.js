var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    gulpif = require('gulp-if'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify');

var jsSources = ['process/js/jquery.min.js', 
                  'process/js/jquery.scrollTo.js', 
                  'process/js/jquery.localScroll.js', 
                  'process/js/myscript.js', 
                  'process/js/canvas.js'],
    sassStyle,
    env = process.env.NODE_ENV || 'development',
    outputDir;

    if(env === 'development'){
      outputDir = 'builds/development/';
      sassStyle = 'expanded';
    }else{
      outputDir = 'builds/production/';
      sassStyle = 'compressed';
    }


gulp.task('autojs', function(){
  gulp.src(jsSources).
    pipe(concat('script.js')).
    pipe(gulp.dest(outputDir + 'js'));
});


 
gulp.task('compress', function() {
  gulp.src('builds/development/js/script.js')
    .pipe(gulpif(env === 'production', minify({
        ext:{
            src:'.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    })))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')));
});

gulp.task('html', function(){
	gulp.src('builds/development/*.html')
      .pipe(gulpif(env === 'production', minifyHTML()))
      .pipe(gulpif(env === 'production', gulp.dest(outputDir)));
});

gulp.task('sass', function () {
    return sass('process/sass/style.scss', {
      sourcemap: true,
      style: sassStyle
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/*.html', ['html']);
  gulp.watch(['process/sass/**/*'], ['sass']);
  gulp.watch(['process/js/**/*'], ['autojs']);
});

gulp.task('webserver', function() {
    gulp.src(outputDir)
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 1010
        }));
});

gulp.task('default', ['watch', 'html', 'autojs', 'sass', 'compress', 'webserver']);
