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
		},

		mocha_istanbul: {
			coverage: {
				src: 'test/*.js'
			}
		},
		istanbul_check_coverage: {
			default: {
				options: {
					coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
					check: {
						lines: 80,
						statements: 80
					}
				}
			}
        }
	});

	grunt.event.on('coverage', function(lcovFileContents, done){
        // Check below
        done();
    });

	grunt.registerTask( 'test', [ 
		'env:test',
		'cafemocha:test'
	]);

	grunt.registerTask( 'coverage', [ 
		'env:coverage',
		'mocha_istanbul:coverage'
	]);
}