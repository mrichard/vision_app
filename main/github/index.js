var GitHubApi = require("github");
var config = require("../../config/config");
var async = require("async");
var moment = require("moment");
var _ = require("underscore");

function GitHubRepo( token, user ){
	this,token = token;
	this.user = user;

	this.github = new GitHubApi({
		version: "3.0.0",
		timeout: 5000
	});

	this.github.authenticate({
		type: "oauth",
		token: token
	});
};

GitHubRepo.prototype.repositories = function( callback ){

	this.github.repos.getAll({}, function( error, response ){
		if( error ) {
			return callback( error, null );
		}

		if( response == null ) {
			return callback( null, null );
		}

		var items = response.map(function(model){
			return _.pick( model, [ 'id', 'name', 'description' ]);
		});

		callback( null, items );
	});

};

module.exports = GitHubRepo;