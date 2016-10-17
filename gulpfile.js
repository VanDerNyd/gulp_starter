'use strict';

//variables
var gulp = require('gulp');
var sass = require('gulp-sass');



//utils
gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'  
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});



//terminal functions
gulp.task('default', ['sass']);
