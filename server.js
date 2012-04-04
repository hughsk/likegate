var http = require('http'),
	gate = require('./index.js');

http.createServer(function(req, res) {
	gate(req, function(err, fields) {
		res.end(JSON.stringify(fields));
	});
}).listen(8212);