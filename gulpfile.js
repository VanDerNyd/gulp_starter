'use strict';

//variables
var gulp = require('gulp');
var sass = require('gulp-sass');
var miniJs = require('gulp-js-minify');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');
var jsFinal = require('gulp-useref');




//utils

gulp.src("./src/test.ext")
  .pipe(notify("Found file: <%= file.relative %>!"));


  
//Sass
gulp.task('sass', function () { 
  return gulp.src('./src/css/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'  
    })
    .on('error', sass.logError))
    .on("error", notify.onError({
		message: 'Shit on this line <%= error.message %>',
        sound: 'Gayyy',
	}))
    .pipe(gulp.dest('./build/'));
    
    
});

 //Minify JavaScript
gulp.task('miniJs', function(){
  gulp.src('./src/js/*.js')
    .pipe(miniJs())
    .pipe(gulp.dest('./build/js/min/*'));
    //.pipe(browserSync.stream())
    //.pipe(browserSync.reload());
});

//BrowserSync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './build/'
    }
  });
});

//watch
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('./src/css/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['miniJs']);
  
});

//rassemble les fichiers js
gulp.task('jsFinal', function(){
  var assets = jsFinal.assets();

  return gulp.src('build/*.html')
    .pipe(assets)
    .pipe(miniJs())
    .pipe(assets.restore())
    .pipe(jsFinal())
    .pipe(gulp.dest('js'));
});


gulp.task('copyHtml', function(){
    return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'));
});


//terminal functions
gulp.task('default', ['copyHtml', 'sass', 'miniJs', 'watch']);
