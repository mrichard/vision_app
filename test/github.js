describe( "when requesting an available resource /project/:id/respos", function(){

	it( 'should respond with 200', function( done ){

		this.timeout( 5000 )
		.request( app )
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