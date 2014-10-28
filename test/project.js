var app = require( '../app' );
var request = require( "supertest" );
var assert = require( "assert" );
var mongoose = require( "mongoose" );
var login = require( "./login" );
var _ = require( 'underscore' );

describe( 'Vision Project API', function() {
	var id;

	beforeEach( function( done ) {
		mongoose.connection.collections[ 'projects'].drop( function( err ) {
			
			var proj = {
				name: 'test name',
				user: login.user,
				token: login.token,
				repositories: ["node-plates"]
			};

			mongoose.connection.collections[ 'projects' ].insert( proj, function( err, docs ) {
				id = docs[0]._id;
				done();
			});
		});
	});

	describe( "When creating a new resource /project", function(){

		var project = {
			name: "New Project",
			user: login.user,
			token: login.token,
			repositories: [ "12345", "9898" ]
		};

		it( "should respond with 201", function( done ) {
			request(app).post( "/project" ).send( project ).expect( "Content-Type", /json/).expect(201).end( function( err, res ) {
				var proj = JSON.parse( res.text );
				assert.equal( proj.name, project.name );
				assert.equal( proj.user, project.user );
				assert.equal( proj.token, project.token );
				assert.equal(proj.repositories[0], project.repositories[0]);
                assert.equal(proj.repositories[1], project.repositories[1]);
                assert.equal(res.header['location'], '/project/' + proj._id);
                done();
			});
		});
	});


	describe( "When requesting an avaialable resource /project/:id", function() {
		it( "should respond with 200", function( done ){
			request( app )
			.get( '/project/' + id)
			.expect( 'Content-Type', /json/)
			.expect( 200 )
			.end( function( err, res ){
				var returnedProject = JSON.parse( res.text );

				assert.equal( returnedProject._id, id);
				assert(_.has(returnedProject, '_id'));
			    assert(_.has(returnedProject, 'name'));
			    assert(_.has(returnedProject, 'user'));
			    assert(_.has(returnedProject, 'token'));
			    assert(_.has(returnedProject, 'created'));
			    assert(_.has(returnedProject, 'repositories'));
			    done();
			})
		});
	});

	describe( "When updating an existing resource /project/:id", function(){

		var projectEdit = {
			name: "new test name",
			user: login.user,
			token: login.token,
			repositories: [ '12345', '9898' ]
		};

		it( "should respond with 204", function( done ){
			request( app )
			.put( '/project/' + id )
			.send( projectEdit )
			.expect( 204 )
			.end( function( err, res ){
				done();
			});
		});
	});


});