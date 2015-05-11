(function() {
    'use strict';

    var gulp = require('gulp'),
        rename = require('gulp-rename'),
        jshint = require('gulp-jshint'),
        jscs = require('gulp-jscs'),
        uglify = require('gulp-uglify'),
        karma = require('gulp-karma'),
        concat = require('gulp-concat-util'),
        project = require('./package.json');

    // project paths
    var paths = {
        src: './src/' + project.name + '.js',
        spec: './test/' + project.name + '.spec.js',
        output: './dist'
    }

    // banner with project info
    var banner = '/*' +
        '\n * ' + project.title + ' - v' + project.version +
        '\n * ' + project.url +
        '\n * ' + project.copyright + ' (c) ' + project.author + ' - ' + project.license + ' License' +
        '\n*/\n\n';

    // tasks
    gulp.task('hint:src', function() {
        return gulp.src(paths.src)
            .pipe(jscs())
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('hint:spec', function() {
        return gulp.src(paths.spec)
            .pipe(jscs())
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('hint', [ 'hint:src', 'hint:spec' ]);

    gulp.task('test', [ 'hint' ], function() {
        return gulp.src([ paths.spec, paths.src ])
            .pipe(karma({configFile: 'test/karma.conf.js'}));
    });

    gulp.task('build', [ 'test' ], function () {
        return gulp.src(paths.src)
            .pipe(concat.header(banner))
            .pipe(gulp.dest(paths.output))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.output));
    });

    // default task
    gulp.task('default', [ 'build' ]);

})();