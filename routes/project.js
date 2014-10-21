var express = require( 'express' );
var logger = require( "../logger" );
var S = require( "string" );
var login = require( "../test/login" );
var ProjectService = require( "../main/project" );

var Project = new ProjectService();
var router = express.Router();

router.post( '/', function(req, res) {
	logger.info('Post.' + req.body.name);

	if( S(req.body.name).isEmpty() ) {
		return res.status( 400 ).json( 'Bad Request.' );
	}

	req.body.user = login.user;
	req.body.token = login.token;

	Project.post( req.body.name, req.body, function( error, project){
		if( error ) return res.status( 500 ).json( 'Internal Server Error' );
		if( project === null ) return res.status( 409 ).json( 'Conflict' );

		res.location( '/project/' + project._id );

		return res.status( 201 ).json( project );
	});
});

module.exports = router;