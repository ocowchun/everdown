var fs = require('fs');


// convert md to html--start
var marked = require('marked');
// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: true,
//   smartLists: true,
//   smartypants: false
// });

// var markdownString = '```js\n console.log("hello"); \n```';

// // Async highlighting with pygmentize-bundled
// marked.setOptions({
// 	highlight: function(code, lang, callback) {
// 		require('pygmentize-bundled')({
// 			lang: lang,
// 			format: 'html'
// 		}, code, function(err, result) {
// 			callback(err, result.toString());
// 		});
// 	}
// });



var filePath = "../tmp/test.md";
var md = fs.readFileSync(filePath, 'utf8');
var renderer = new marked.Renderer();

var markedCode = renderer.code;
renderer.code = function(code, lang) {
	// console.log("lang:" );
	// return code;
	var html = markedCode.apply(this, [code, lang]);
	html = html.replace('<code class="', '<code class=" hljs ')
	return html;

}

// Synchronous highlighting with highlight.js
marked.setOptions({
	renderer: renderer,
	highlight: function(code) {
		return require('highlight.js').highlightAuto(code).value;
	}
});

var html = marked(md);
// convert md to html---end
// console.log(html)

// 等一下再來研究

var enmlOfHtmljs = require('./enmlOfHtml');


var html = '<link rel="stylesheet" href="" />' + html;

var css = fs.readFileSync('../assets/stylesheets/sublime.css', 'utf8')


// // var css=''

// // or put options
// // `css` and `defaultDomain` is supported
var options = {
	css: css
	// defaultDomain: 'will be used for replacing href or src with relative path as values'
};


// // ENML is valid ENML that you can send to evernote for creation
enmlOfHtmljs.ENMLOfHTML(html, options, function(err, ENML) {
	console.log("fcu");
	console.log(ENML);

});

// 完成md 2 enml