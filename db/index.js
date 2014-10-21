var mongoose = require( 'mongoose' );
var config = require( '../config/config' );

var connectionString = config.get( "mongo:url" );
var options = {
	auto_reconnect: config.get( "mongo:auto_reconnect" ),
	poolSize: config.get( "mongo:poolSize" )
};

mongoose.connection.open( connectionString, options );

