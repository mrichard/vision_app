var express = require( 'express' );
var http = require( 'http' );
var db = require( './db' );

var logger = require('morgan');
var bodyParser = require( 'body-parser' );

var config = require( './config/config');

var heartbeatRouter = require( './routes/heartbeat' );
var projectRouter = require( './routes/project' );
var notFound = require( './routes/notFound' );

var app = express();

app.use( bodyParser() );

// set port
app.set( 'port', config.get( "express:port" ) );

// logging
app.use( logger( config.get( "logger:level" ), { immediate: true }) );

// create heatbeat route
app.use( '/heartbeat', heartbeatRouter );
app.use( '/project', projectRouter );
app.use( notFound.index );

// create server
app.listen( app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;