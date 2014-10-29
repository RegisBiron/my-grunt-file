module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        dev: 'dev',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.dev %>/scripts/{,*/}*.js'],
                options: {
                    livereload: true
                }
            },
            autoprefixer: {
                files: ['.tmp/styles/*.css'],
                tasks: ['autoprefixer'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%= config.dev %>/scss/{,*/}*.scss'],
                tasks: ['sass:dev'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                  livereload: '<%= connect.options.livereload %>'
                },
                files: [
                  '<%= config.dev %>**/*.html',
                  '<%= config.dev %>/scss/{,*/}*.scss'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static(config.dev)
                        ];
                    }
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                expand: true,
                cwd: '<%= config.dev %>/scss/',
                src: ['*.scss'],
                dest: '.tmp/styles/',
                ext: '.css'
            },
            dev: {
                options: {
                    style: 'expanded',
                    debugInfo: true,
                    lineNumbers: true
                },
                expand: true,
                cwd: '<%= config.dev %>/scss/',
                src: ['*.scss'],
                dest: '.tmp/styles/',
                ext: '.css'
            }
        },

        autoprefixer: {
            options: {
              browsers: ['last 1 version']
            },
            multiple_files: {
              expand: true,
              flatten: true,
              src: '.tmp/styles/*.css',
              dest: ''
            },
            sourcemap: {
                options: {
                    map: true
                },
                src: '.tmp/styles/',
                dest: '<%= config.dev %>/styles/'
            },
        },

        concat: {   
            dist: {
                src: [
                    '<%= config.dev %>/scripts/*.js'
                ],
                dest: '.tmp/scripts/main.js',
            }
        },

        uglify: {
            dist: {
                src: '.tmp/scripts/main.js',
                dest: '<%= config.dist %>/scripts/main.min.js'
            }
        },

        clean: {
            dist: {
                src: [".tmp/"]
            }
        },

        responsive_images: {
            dist: {
                options: {
                    engine: 'im'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dev %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        }
    });

    grunt.registerTask('serve', function (target) {

        grunt.task.run([
            'connect:livereload',
            'sass:dev',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'responsive_images',
        'sass:dist',
        'concat:dist',
        'uglify:dist',
        'clean:dist'
    ]);

    grunt.registerTask('default', [
     
    ]);
};
