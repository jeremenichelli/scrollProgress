var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat-util'),
    package = require('./package.json');

var paths = {
        output : 'dist/',
        scripts : 'src/' + package.name + '.js',
        test: 'test/spec/' + package.name + '.spec.js'
    },
    banner = {
        top: '// ' + package.title + ' - ' + package.author + ' - v' + package.version + '\n' +
            '// ' + package.repository.url + ' - MIT License\n'
    };

gulp.task('lint', function(){
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify', ['lint'], function(){
    return gulp.src(paths.scripts)
        .pipe(concat.header(banner.top))
        .pipe(gulp.dest(paths.output))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('default', ['minify']);