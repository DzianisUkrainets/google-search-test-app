'use strict'

var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    gulpif = require('gulp-if'),
    util = require('gulp-util'),
    seq = require('gulp-sequence'),
    inject = require('gulp-inject'),
    cssnano = require('gulp-cssnano');

var dev = util.env.dev;

var paths = {
    sourceJs: './public/js/**/*.js',
    sourceLess: './public/styles/**/*.less',
    sourceHtml: './public/**/*.html',
    destJs: 'build/js/**/*.js',
    destCss: 'build/css/**/*.css',
    destJsFolder: 'build/js',
    destCssFolder: './build/css',
    destFolder: 'build'
}

gulp.task('less', function () {
  return gulp.src(paths.sourceLess)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulpif(!dev, concatCss("styles.min.css")))
    .pipe(gulpif(!dev, cssnano()))
    .pipe(gulp.dest(paths.destCssFolder));
});

gulp.task('js', function() {
	return gulp.src(paths.sourceJs)
    .pipe(gulpif(!dev, uglify()))
    .pipe(gulpif(!dev, concat('app.min.js')))
    .pipe(gulp.dest(paths.destJsFolder));
});

gulp.task('html', function() {
    var target = gulp.src([paths.sourceHtml]);
    var sources = gulp.src([paths.destJs, paths.destCss], {read: false}, {relative: true});

    return target
        .pipe(inject(sources, {ignorePath: paths.destFolder}))
        .pipe(gulp.dest(paths.destFolder))
});

gulp.task('clean', function () {
	return gulp.src('build', {read: false})
		.pipe(clean());
});

gulp.task('watch', ['clean', 'build'], function() {
    gulp.watch([paths.sourceJs], ['js']);
    gulp.watch([paths.sourceLess], ['less']);
    gulp.watch([paths.sourceHtml], ['html']);
});

gulp.task('build', seq(['less', 'js', ],'html'));
gulp.task('cleanbuild', ['clean']);
