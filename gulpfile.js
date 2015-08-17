var config = require("./config.json")
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat');

gulp.task('concat_basic', function () {
	return gulp.src(config.lib.basic)
		.pipe(concat("basic.js"))
		.pipe(gulp.dest('webapp/public/js'));
});

gulp.task("test", function () {
	console.log(config.lib.basic);
});