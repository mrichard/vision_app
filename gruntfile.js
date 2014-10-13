module.exports = function( grunt ) {
	grunt.loadNpmTasks( 'grunt-mocha-istanbul' );
	grunt.loadNpmTasks( 'grunt-cafe-mocha' );
	grunt.loadNpmTasks( 'grunt-env' );

	grunt.initConfig({
		env: {
			test: { NODE_ENV: 'TEST' },
			coverage: { NODE_ENV: 'COVERAGE' }
		},

		cafemocha: {
			test: {
				src: 'test/*.js',
				options: {
					ui: 'bdd',
					reporter: 'spec'
				}
			},
			coverage: {
				src: 'test/*.js',
				options: {
					ui: 'bdd',
					reporter: 'html-cov',
					coverage: {
						output: 'coverage.html'
					}
				}
			}
		}
	});

	grunt.registerTask( 'test', [ 
		'env:test',
		'cafemocha:test'
	]);

	grunt.registerTask( 'coverage', [ 
		'env:coverage',
		'cafemocha:coverage'
	]);
}