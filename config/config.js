var nconf = require( 'nconf' );
var path = require( 'path' );

function Config() {
	nconf.argv().env("_");
	var environment = nconf.get( "NODE:ENV" );
	nconf.file( environment,  path.join( process.cwd(), "config", environment + ".json" ));
	nconf.file( "default", path.join( process.cwd(), "config", "default.json" ));
}

Config.prototype.get = function( key ){
	return nconf.get( key );
};

module.exports = new Config();


