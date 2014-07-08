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
        progressWrapper,
        progressElement,
        config,
        endPoint,
        isSet = false;

    var _init = function(){
        if (!isSet) _set();
        endPoint = _getEndPoint();
        _updateMetrics();
        window.onscroll = _setProgress;
        window.onresize = _updateMetrics.bind(null);
    };

    var _createElements = function(){
        progressWrapper = document.createElement('div');
        progressElement = document.createElement('div');

        progressWrapper.id = 'progressWrapper';
        progressElement.id = 'progress';

        progressWrapper.appendChild(progressElement);
        body.appendChild(progressWrapper);
    };

    var _setConfigObject = function(obj){
        // default configuration object
        config = {
            bottom : false,
            color : '#000000',
            height : '5px',
            styles : true
        };
        // override with custom attributes
        if (typeof obj == 'object'){
            for (var key in config){
                if(typeof obj[key] != 'undefined') {
                    config[key] = obj[key];
                }
            }
        }
    };

    var _setElementsStyles = function(custom){
        // checks overrides
        _setConfigObject(custom);
        // setting progress to zero and wrapper to full width
        progressElement.style.width = '0';
        progressWrapper.style.width = '100%';
        // checks styles flag
        if (config.styles) {
            // progress element
            progressElement.style.backgroundColor = config.color;
            progressElement.style.height = config.height;
            // progress wrapper
            progressWrapper.style.position = 'fixed';
            progressWrapper.style.left = '0';
            // sets position
            if(config.bottom) {
                progressWrapper.style.bottom = '0';
            } else {
                progressWrapper.style.top = '0';
            }
        }
    };

    var _set = function(custom){
        if (!isSet){
            _createElements();
            _setElementsStyles(custom);
            isSet = true;
            // returns constructor object
            return window.scrollProgress;
        } else {
            return 'scrollProgress has already been set!';
        }
    };

    var _setProgress = function(){
        try {
            var y = window.scrollY || window.pageYOffset;
            progress = (y / endPoint)*100;
            progressElement.style.width = progress+'%';
        } catch(e) {
            console.log(e);
        }
    };

    var _updateMetrics = function(){
        endPoint = _getEndPoint();
        _setProgress();
    };

    var _getEndPoint = function(){
        var end = body.scrollHeight - window.innerHeight;
        return end;
    };

    return {
        init : _init,
        set : _set
    };
});
