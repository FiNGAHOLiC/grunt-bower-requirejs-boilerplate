module.exports = function(grunt){

	var BANNER_TEMPLATE_STRING = '/*! <%= pkg.name %> - v<%= pkg.version %> - '
		+ '<%= grunt.template.today("yyyy-mm-dd") %> */\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			production: ['production']
		},
		copy: {
			production: {
				files: [
					{
						expand: true,
						cwd: 'development/',
						src: ['**', '!**/_src/**'],
						dest: 'production/'
					}
				]
			}
		},
		compress: {
			production: {
				options: {
					archive: 'htdocs<%= grunt.template.today("yyyymmdd") %>.zip'
				},
				files: [
					{
						expand: true,
						cwd: 'production/',
						src: '**',
						dest: 'htdocs/'
					}
				]
			}
		},
		connect: {
			development: {
				options: {
					port: 8000,
					base: 'development'
				}
			},
			production: {
				options: {
					port: 8001,
					base: 'production',
					keepalive: true
				}
			}
		},
		regarde: {
			scripts: {
				files: 'development/assets/js/_src/**/*.js',
				tasks: ['requirejs', 'uglify']
			},
			sass: {
				files: 'development/assets/css/_src/**/*.scss',
				tasks: ['sass', 'cssmin']
			}
		},
		imagemin: {
			production: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						cwd: 'production/assets/img/',
						src: '**/*.{png,jpg,jpeg}',
						dest: 'production/assets/img/'
					}
				]
			}
		},
		requirejs: {
			assets: {
				options: {
					name: 'main',
					baseUrl: 'development/assets/js/_src',
					mainConfigFile: 'development/assets/js/_src/main.js',
					out: 'development/assets/js/main.js',
					optimize: 'none'
				}
			}
		},
		uglify: {
			options: {
				banner: BANNER_TEMPLATE_STRING
			},
			assets: {
				files: {
					'development/assets/js/main.min.js': 'development/assets/js/main.js'
				}
			}
		},
		sass: {
			assets: {
				options: {
					style: 'expanded'
				},
				files: {
					'development/assets/css/main.css': 'development/assets/css/_src/styles.scss'
				}
			}
		},
		cssmin: {
			options: {
				banner: BANNER_TEMPLATE_STRING
			},
			assets: {
				files: {
					'development/assets/css/main.min.css': 'development/assets/css/main.css'
				}
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('development', [
		'requirejs',
		'uglify',
		'sass',
		'cssmin',
		'connect:development',
		'regarde'
	]);
	grunt.registerTask('production', [
		'clean',
		'copy',
		'imagemin',
		'compress',
		'connect:production'
	]);

};
