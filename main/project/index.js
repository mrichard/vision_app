var ProjectSchema = require( "../../models" ).model( 'Project' );
var GitHubRepo = require( "../github" );
var _ = require( "underscore" );


function Project() {};

Project.prototype.post = function( name, data, callback ){
	var query = { 'name': name };
	var project = new ProjectSchema( data );

	ProjectSchema.findOne( query, function( error, proj ){
		if( error ) return callback( error, null );

		if( proj !== null ) return callback( null, null );

		project.save( function( error, p ){
			if( error )return callback( error, null );

			return callback( null, p );
		});
	});
};

Project.prototype.get = function( id, callback ) {
	var query = { "_id": id };
	ProjectSchema.findOne( query, function( error, project ){
		if( error ) return callback( error, null );

		return callback( null, project );
	});
};

Project.prototype.put = function( id, data, callback ) {
	var query = { '_id': id };

	ProjectSchema.findOne( query, function( error, proj ){

		if( error ) {
			return callback( error, null );
		}

		if( proj = null ) {
			return callback( null, null );
		}

		ProjectSchema.update( query, data, function( error, project ){

			if( error ) {
				return callback( error, null );
			}

			return callback( null, project );
		});
	});
};

Project.prototype.delete = function deleteProjectSchema ( id, callback ) {
	var query = { '_id': id };

	ProjectSchema.findByIdAndRemove( id, function (error, proj) {
		if( error ) {
			callback( error, null );
		}

		return callback(null, proj);
	})
}

Project.prototype.all = function allProjects (id, callback ) {
	var query = { user: id };

	ProjectSchema.find( query, function( error, projects ){

		if( error ){
			return callback( error, null );
		}

		if( projects === null ) {
			return callback( null. null );
		}

		return callback( null, projects );
	});
}

Project.prototype.repos = function (id, callback) {
	
	ProjectSchema.findOne({ _id: id }, function( error, project ){
		if( error ) {
			return callback( error, null );
		}

		if( project === null ) {
			return	callback( null, null );
		}

		var git = new GitHubRepo( project.token, project.user );

		git.repositories(function( error, response ){

			if( error) {
				return callback( error, null );
			}

			if( response == null ) {
				return callback( null, null );
			}

			items = response.map( function(model){
				var item = _.pick(model, ['id', 'name', 'description']);
				var enabled = _.find( project.repositories, function( p ){
					return p === item.name;
				});

				(enabled) ? item.enabled = 'checked' : item.enabled = '';

				return item;
			});

			return callback( null, items );
		});
	});
};


module.exports = Project;



