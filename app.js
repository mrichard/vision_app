var express = require( 'express' );
var http = require( 'http' );
var config = require( './config/config');
var app = express();

// set port
app.set( 'port', config.get( "express:port" ) );

// create heatbeat route
app.route( '/heartbeat' )
.get( function( req, res ){
	res.status( 200 ).json( 'OK' );
});

// create server
app.listen( app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;