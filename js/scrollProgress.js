// scrollProgress by Jeremias Menichelli - MIT License
scrollProgress = (function(document, body, undefined){
	var progress = 0
	, progressWrapper
	, progressElement
	, config
	, endPoint
	// set flag
	, isSet = false;

	var _init = function(el){
		var element = el || body;
		endPoint = _getElementGap(element);	

		if (!isSet) _set();

		_updateMetrics(element);
		window.onscroll = _setProgress;
		window.onresize = _updateMetrics.bind(null, element);
	}

	var _createElements = function(){
		progressWrapper = document.createElement('div');
		progressElement = document.createElement('div');

		progressWrapper.id = 'progressWrapper';
		progressElement.id = 'progress';

		progressWrapper.appendChild(progressElement);
		body.appendChild(progressWrapper);
	}

	var _setConfigObject = function(obj){
		// default configuration object
		config = {
			bottom : false,
			color : '#000000',
			height : '5px',
			styles : true
		};
		// override with custom attributes
		for (var key in config){
			if(typeof obj[key] != 'undefined') {
				config[key] = obj[key];
			}
		}
	}

	var _setElementsStyles = function(custom){
		// checks overrides
		if (typeof custom == 'object') _setConfigObject(custom);
		// checks styles flag
		if (config.styles) {
			// progress element
			progressElement.style.backgroundColor = config.color;
			progressElement.style.height = config.height;
			progressElement.style.width = '0';
			// progress wrapper
			progressWrapper.style.position = 'fixed';
			progressWrapper.style.left = '0';
			progressWrapper.style.width = '100%';
			// sets position
			if(config.bottom) {
				progressWrapper.style.bottom = '0';
			} else {
				progressWrapper.style.top = '0';
			}
		}
	}

	var _set = function(custom){
		if (!isSet){
			_createElements();
			_setElementsStyles(custom);
			isSet = true;
			// returns constructor object
			return window.scrollProgress
		} else {
			return 'scrollProgress has already been set!';
		}
	}

	var _setProgress = function(){
		try {
			var y = window.scrollY || window.pageYOffset;
			progress = (y / endPoint)*100;
		} catch(e) {
			console.log(e);
		} finally {
			progressElement.style.width = progress+'%';
		}
	}

	var _updateMetrics = function(el){
		endPoint = _getElementGap(el);
		_setProgress();
	}

	var _getElementGap = function(element){
		var end = element.scrollHeight - window.innerHeight;
		return end;
	}

	return {
		init : _init,
		set : _set
	}
})(document, document.body, undefined);