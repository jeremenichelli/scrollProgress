// karma.conf.js
module.exports = function(config) {
    config.set({
        files: [ '../src/scrollProgress.js', '../test/scrollProgress.spec.js' ],
        browsers: [ 'PhantomJS' ],
        frameworks: [ 'jasmine' ],
        reporters: [ 'spec' ]
    });
};