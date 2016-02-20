'use strict'

var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var path = require('path');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

//var debug = util.env.debug,

gulp.task('less', function () {
  return gulp.src('./public/styles/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concatCss("styles.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'));
});


gulp.task('js', function() {
	return gulp.src('./public/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('html', function() {
    return gulp.src(['./public/*.html'])
        .pipe(gulp.dest('build'))
});

gulp.task('clean', function () {
	return gulp.src('build', {read: false})
		.pipe(clean());
});


gulp.task('build', ['less', 'js', 'html']);
gulp.task('cleanbuild', ['clean']);
