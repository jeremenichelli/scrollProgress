scrollProgress
==============

This scripts show a progress bar that indicates how much you've scrolled on a website. It's very useful to show the reading progress in an article or a blog post. Just add the script and call *scrollProgress.init()*, a black bar on the upper part of your website to show the scrolling progress. The script supports IE9+ and all modern browsers.


Use
---

After you included the script in your project or just added a script tag that may look like this *<script src="js/scrollProgress.js"></script>*, just write *scrollProgress.init()* and a black progress bar on the top will track the scrolling.


Configuration
-------------

If you want to change some attributes of the progress bar... you can do it directly when you call it! You can change _height_, _color_ and put the bar on the bottom if you already have fixed content on the top of your website. You have to do this:

*scrollProgress.set({
    color : '#FF9900',
    height : '12px',
    bottom : true
});
scrollProgress.init();*

The default values are _#000000_, _5px_ and _false_.

_But what if you want to set the styles using css?_ In that case there's another parameter you can pass to the _set()_ function to deactivate the inline styles and set them by your own:

*scrollProgress.set({
    styles : false
});
scrollProgress.init();*

The script appends two elements, _#progressWrapper_ and _#progress_ so feel free to change the styles using CSS. Just be sure you're setting the _styles_ property to _false_ so *scrollProgress* doesn't write inline styles on the elements.

Actually, it supports _chaining_... So after you set the configuration you can just initialize it like this:

*scrollProgress
	.set({
	    color : '#33A5EF',
	    height : '15px',
	    bottom : true
	})
	.init();*

_Make sure to call the set function *before* the init function._



