var express = require( 'express' );
var logger = require( '../logger' );

var router = express.Router();

exports.index = function(req, res) {
	logger.error( "404: Page Not Found!!" );
	res.status( 404 ).json( 'Not Found.' );
};