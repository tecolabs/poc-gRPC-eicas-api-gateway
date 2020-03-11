var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    usemin = require('gulp-usemin'),
    del = require('del');

gulp.task('jshint', function() {
    return gulp.src(['**/*.js' , '!./node_modules/'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin');
});

gulp.task('usemin',['jshint'], function () {
    return gulp.src('**/*')
        .pipe(gulp.dest('dist/'));
});
