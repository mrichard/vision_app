var app = require( '../app' );
var request = require( 'supertest' );

describe( 'vision heartbeat api', function() {
	describe( 'when requesting resource /heartbeat', function() {
		it( 'should respond with 200' , function( done ) {
			request( app )
			.get( '/heartbeat' )
			.expect( 'Content-type', /json/)
			.expect( 200, done );
		});
	});

	describe( 'when requesting resource /missing', function() {
		it( 'should respond with 404', function( done ) {
			request( app )
			.get( '/missing' )
			.expect( 'Content-type', /json/)
			.expect( 404, done );
		});
	});
});