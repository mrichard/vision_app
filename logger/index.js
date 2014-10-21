var winston = require( 'winston' );
var config = require( '../config/config' );

console.log( "MIKE" );
console.log( config );

function Logger() {
	return winston.add( winston.transports.File, {
		filename: config.get( 'logger:filename' ),
		maxsize: config.get( 'logger:maxsize' ),
		maxFiles: config.get( 'logger:maxfiles' ),
		level: config.get( 'logger.level' )
	});
};

module.exports = new Logger();