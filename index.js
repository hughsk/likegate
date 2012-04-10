var formidable = require('formidable');

module.exports = function(request, options, callback) {
	var form = new formidable.IncomingForm();

	if (typeof options === 'function') {
		callback = options;
		options = {};
	} else {
		callback = callback || function () {};
		options = options || {};
		options.secret = options.secret || false;
	}

	// Support Connect
	if (request.body) {
		module.exports.processFields(callback)(null, request.body);
	} else {
		form.parse(request, module.exports.processFields(callback));
	}
};

module.exports.processFields = function(callback) {
	return function(err, fields) {
		var encodedSignature,
			payload, signature, data,
			output, shouldContinue = true;


		if (!fields || !fields.signed_request) {
			return callback(null, false);
		}

		try {
			encodedSignature = fields.signed_request.split('.');
			payload = encodedSignature[1];
			encodedSignature = encodedSignature[0];

			signature = module.exports.decode(encodedSignature);
			data = JSON.parse(module.exports.decode(payload));

			// @todo: Validate options.secret
		} catch(e) {
			shouldContinue = false;
			callback(e);
		}

		if (!shouldContinue) return;

		callback(null, data);
	}
}

module.exports.decode = function(encoded) {
	return new Buffer(encoded, 'base64')
		.toString('utf8')
		.replace(/\-/g, '+')	
		.replace(/\_/g, '/');	
};
