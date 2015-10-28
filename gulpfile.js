(function() {
    'use strict';

    /*
     * aliasses
     * gulp: gulp streaming build system
     * $: namespace for gulp plugins
     */
    var gulp = require('gulp'),
        $ = require('gulp-load-plugins')(),
        // project information
        project = require('./package.json'),
        // karma test server
        karmaServer = require('karma').Server;

    /*
     * gulp plugins available
     *
     * $.rename: gulp-rename
     * $.uglify: gulp-uglify
     * $.karma: gulp-karma
     * $.concatUtil: gulp-concat-util
     * $.eslint: gulp-eslint
     */

    /*
     * project paths
     */
    var paths = {
        src: './src/' + project.name + '.js',
        spec: './test/' + project.name + '.spec.js',
        output: './dist'
    }

    /*
     * project banner for dist version
     */
    var banner = '/*' +
        '\n * ' + project.title + ' - v' + project.version +
        '\n * ' + project.url +
        '\n * ' + project.copyright + ' (c) ' + project.author + ' - ' + project.license + ' License' +
        '\n*/\n\n';

    /*
     * checks syntax in source files
     *
     * gulp lint:src
     */
    gulp.task('lint:src', function() {
        return gulp.src(paths.src)
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.eslint.failAfterError());
    });

    /*
     * checks syntax in test files
     *
     * gulp lint:src
     */
    gulp.task('lint:spec', function() {
        return gulp.src(paths.spec)
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.eslint.failAfterError());
    });

    /*
     * groups lint tasks
     *
     * gulp lint
     */
    gulp.task('lint', [ 'lint:src', 'lint:spec' ]);

    /*
     * checks general syntax and run tests on source files
     *
     * gulp test
     */
    gulp.task('test', [ 'lint' ], function(done) {
        var server = new karmaServer({
            configFile: __dirname + '/test/karma.conf.js',
            singleRun: true
        }, done);

        return server.start();
    });

    /*
     * run tests and creates distribution files
     *
     * gulp build
     */
    gulp.task('build', [ 'test' ], function () {
        return gulp.src(paths.src)
            .pipe($.concatUtil.header(banner))
            .pipe(gulp.dest(paths.output))
            .pipe($.uglify())
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.output));
    });

    /*
     * default task */
    gulp.task('default', [ 'build' ]);

})();