var express = require( 'express' );
var ProjectService = require( '../main/project' );
var logger = require( "../logger" );

var Project = new ProjectService();
var router = express.Router({ mergeParams: true });

router.get( '/', function (req, res) {
	logger.info('Github Request.' + req.url);

	Project.repos( req.params.id, function(error, repos){

		if( error ) {
			return res.status(500).json('Internal Server Error');
		}

		if( repos === null ){
			return res.status(404).json( 'Not Found' );
		}

		return res.status(200).json( repos );
	});

});

module.exports = router;

