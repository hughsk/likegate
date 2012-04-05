# likegate

Small server-side validation/info for Facebook canvas apps.

*Note: doesn't currently validate whether the request if from within Facebook or not, will be adding this soon though.*

## Installation

    npm install likegate

## Usage

``` javascript
var gate = require('likegate');

http.createServer(function(req, res) {
	if (req.method == 'POST') {
		gate(req, function(err, fields) {
			console.log(fields.page.liked); // `true` if the user has liked the page
			console.log(fields.page.admin); // `true` if the user is an admin
		});
	} else {
		res.end('Should be a POST request');
	}
});
```