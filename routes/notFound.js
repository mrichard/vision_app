var express = require( 'express' );
var router = express.Router();

/*router.get( '/', function(req, res) {
	res.status( 404 ).json( 'Not Found.' );
});
*/

exports.index = function(req, res) {
	res.status( 404 ).json( 'Not Found.' );
};