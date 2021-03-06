var heartbeatRouter = require( './heartbeat' );
var projectRouter = require( './project' );
var githubRouter = require( './github' );
var notFound = require( './notFound' );


module.exports = function (app) {
	// mount routes
	app.use( '/heartbeat', heartbeatRouter );
	app.use( '/project', projectRouter );
	app.use( '/project/:id', githubRouter );
	app.use( notFound.index );
}