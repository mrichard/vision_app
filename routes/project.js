var express = require( 'express' );
var logger = require( "../logger" );
var S = require( "string" );
var login = require( "../test/login" );
var ProjectService = require( "../main/project" );

var projectServ = new ProjectService();
var router = express.Router();

router.post( '/', function createProject( req, res ) {
	logger.info('Post.' + req.body.name);

	if( S(req.body.name).isEmpty() ) {
		return res.status( 400 ).json( 'Bad Request.' );
	}

	req.body.user = login.user;
	req.body.token = login.token;

	projectServ.post( req.body.name, req.body, function( error, project ){
		if( error ) return res.status( 500 ).json( 'Internal Server Error' );
		if( project === null ) return res.status( 409 ).json( 'Conflict' );

		res.location( '/project/' + project._id );

		return res.status( 201 ).json( project );
	});
});

router.get( '/:id', function getProject ( req, res ){
	logger.info( 'Get. ' + req.url );

	projectServ.get( req.params.id, function( error, project ){
		if( error ) {
			return res.status( 500 ).json( 'Internal Server Error' );
		}

		if( project === null ) {
			return res.status( 404 ).json( "Not Found" );
		}

		return res.status( 200 ).json( project );

	});
});

router.put( '/:id', function ( req, res ){
	logger.info( 'Put. ' + req.url );

	if( S(req.body.name).isEmpty() ) {
		return res.status( 400 ).json( 'Bad Request.' );
	}

	req.body.user = login.user;
	req.body.token = login.token;

	projectServ.put( req.params.id, req.body, function( error, project ){

		logger.info( "IN PROJECT SERV PUT CALLBACK" );
		if( error ) {
			return res.status( 500 ).json( 'Internal Server Error' );
		}

		if( project == null ) {
			return res.status(404).json( 'No Content' );
		}

		return res.status( 204 ).end();
	});
});


router.delete( '/:id', function deleteProject ( req, res ) {
	logger.info( "Delete. " + req.url );

	projectServ.delete( req.params.id, function ( error, project ) {
		if( error ) {
			return res.status( 500 ).json( "Internal Server Error" );
		}

		if( project === null ) {
			return res.status( 404 ).json( "Not Found" );
		}

		return res.status( 204 ).end();
	})
});

router.get( '/', function getAll ( req, res ) {
	logger.info( 'Request. ' + req.url );
	var userId = login.user || req.query.user || req.user.id;

	projectServ.all( userId, function (error, projects ) {
		if( error ) {
			return res.status( 500 ).json( 'Internal Server Error' );
		}

		if( projects === null ) {
			projects = {};
		}

		return res.status( 200 ).json( projects );
	})
})

module.exports = router;




