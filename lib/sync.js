// 找出資料夾的所有md檔
var fs = require('fs');
var _ = require('underscore');
fs.readdir('../tmp', function(err, files) {
	var mdFiles = _.filter(files, function(file) {
		return file.substr(-3) === '.md';
	});
	_.each(mdFiles, function(file) {
		syncFile(file);
	});
});

// sync

function syncFile(file) {
	console.log(file);
}