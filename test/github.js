var app = require( '../app' );
var request = require( "supertest" );
var assert = require( "assert" );
var mongoose = require( "mongoose" );
var login = require( "./login" );
var _ = require( 'underscore' );


describe( 'vision github api', function(){
	var id;

	beforeEach( function( done ){
		mongoose.connection.collections['projects'].drop( function( err ){

			var proj = {
				name: "test name",
				deleted: false,
				user: login.user,
				token: login.token,
				repositories: ["node-plates"]
			};

			mongoose.connection.collections['projects'].insert( proj, function(err, docs){
				id = docs[0]._id;
				done();
			});
		});
	});

	describe( "when requesting an available resource /project/:id/respos", function(){

		it( 'should respond with 200', function( done ){

			this.timeout( 5000 );
			request( app )
			.get( '/project/' + id + '/repos')
			.expect( 'Content-Type', /json/)
			.expect( 200 )
			.end( function( err, res ){
				var repo = _.first( JSON.parse(res.text) );
				assert( _.has(repo, 'id') );
				assert( _.has(repo, 'name') );
				assert( _.has(repo, 'description') );

				done();
			});
		});
	});
});