(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.scrollProgress = factory(root);
    }
})(this, function() {
    'use strict';

    var body = document.body,
        progress = 0,
        isSet = false,
        progressWrapper,
        progressElement,
        endPoint,
        // default configuration object
        config = {
            bottom: true,
            color: '#000000',
            height: '5px',
            styles: true,
            prefix: 'progress',
            events: true
        };

    var _createElements = function() {
        progressWrapper = document.createElement('div');
        progressElement = document.createElement('div');

        progressWrapper.id = config.prefix + '-wrapper';
        progressElement.id = config.prefix + '-element';

        progressWrapper.appendChild(progressElement);
        body.appendChild(progressWrapper);
    };

    var _setConfigObject = function(obj) {
        // override with custom attributes
        if (typeof obj === 'object') {
            for (var key in config) {
                if (typeof obj[key] !== 'undefined') {
                    config[key] = obj[key];
                }
            }
        }
    };

    var _setElementsStyles = function() {
        // setting progress to zero and wrapper to full width
        progressElement.style.width = '0';
        progressWrapper.style.width = '100%';

        // set styles only if
        // settings is true
        if (config.styles) {
            // progress element
            progressElement.style.backgroundColor = config.color;
            progressElement.style.height = config.height;

            // progress wrapper
            progressWrapper.style.position = 'fixed';
            progressWrapper.style.left = '0';

            // sets position
            if (config.bottom) {
                progressWrapper.style.bottom = '0';
            } else {
                progressWrapper.style.top = '0';
            }
        }
    };

    var _set = function(custom) {
        // set only once
        if (!isSet) {
            if (custom) {
                _setConfigObject(custom);
            }
            _createElements();
            _setElementsStyles();

            // set initial metrics
            _setMetrics();

            // bind events only if
            // settings is true
            if (config.events) {
                window.onscroll = _setProgress;
                window.onresize = _setMetrics;
            }

            isSet = true;
        } else {
            console.error('scrollProgress has already been set!');
        }
    };

    var _setProgress = function() {
        try {
            var y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            progress = (y / endPoint) * 100;
            progressElement.style.width = progress + '%';
        } catch (e) {
            console.error(e);
        }
    };

    var _setMetrics = function() {
        endPoint = _getEndPoint();
        _setProgress();
    };

    var _getEndPoint = function() {
        return body.scrollHeight - window.innerHeight || document.documentElement.clientHeight;
    };

    return {
        set: _set,
        trigger: _setProgress,
        update: _setMetrics
    };
});
