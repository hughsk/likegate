var http = require('http'),
	gate = require('./index.js'),
	connect = require('connect');

// Vanilla Server
http.createServer(function(req, res) {
	gate(req, function(err, fields) {
		res.end(JSON.stringify(fields));
	});
}).listen(8212);

// Connect Server
/*

connect.createServer(function(req, res) {
	gate(req, function(err, fields) {
		res.end(JSON.stringify(fields));
	});
}).listen(8212);

*/