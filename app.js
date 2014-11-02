var express = require( 'express' );
var http = require( 'http' );
var db = require( './db' );

var logger = require('morgan');
var bodyParser = require( 'body-parser' );

var config = require( './config/config');

var app = express();

app.use( bodyParser() );

// set port
app.set( 'port', config.get( "express:port" ) );

// logging
app.use( logger( config.get( "logger:level" ), { immediate: true }) );

// mount routes
require( './routes')( app );

// create server
app.listen( app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;