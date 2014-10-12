var express = require( 'express' );
var http = require( 'http' );
var config = require( './config/config');
var heartbeat = require( './routes/heartbeat' );
var notFound = require( './routes/notFound' );

var app = express();

// set port
app.set( 'port', config.get( "express:port" ) );

// create heatbeat route
app.use( '/heartbeat', heartbeat );
app.use( notFound.index );

// create server
app.listen( app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;