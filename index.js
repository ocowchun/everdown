'use strict';

var enmlOfHtmljs = require('enmlOfHtml');

var options = {
	// css: css
	// defaultDomain: 'will be used for replacing href or src with relative path as values'
};

var html='hello';

// ENML is valid ENML that you can send to evernote for creation
enmlOfHtmljs.ENMLOfHTML(html, options, function(err, ENML) {
	console.log(ENML);

});