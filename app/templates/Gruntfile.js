
module.exports = function (grunt) {
  'use strict';

  var appConfig = {

    // Default Paths
    path: {
      src: 'src',
      www: 'www',
      assets: 'www/assets',
      fonts: 'src/data/fonts',
      styles: 'src/styles',
      controllers: 'src/controllers',
      views: 'src/views'
    },

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * <%= pkg.description %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n',


    /************************************
     * grunt-contrib-clean
     * Clean files and folders
     ************************************/
    clean: {
      dist: ['<%= path.assets %>/css',
            '<%= path.assets %>/js',
            '<%= path.assets %>/fonts']
    },

    /************************************
     * grunt-sass
     * Compile SCSS to CSS using node-sass
     ************************************/
    sass: {
      prod: {
        options: {
          outputStyle: 'nested'
        },
        files: {
          '<%= path.assets %>/css/main.css': '<%= path.styles/build.scss'
        }
      }
    },

    /************************************
     * grunt-contrib-concat
     * Concatenate files
     ************************************/
    concat: {
      prod: {
        src: [
          '<%= path.controllers %>/*.js'
        ],
        dest: '<%= path.assets %>/js/main.js'
      }
    },

    /************************************
     * grunt-contrib-uglify
     * Minify files
     ************************************/
    uglify: {
      options: {
        report: 'min'
      },
      prod: {
        src: '<%= path.src %>/main.js',
        dest: '<%= path.src %>/main.min.js'
      }
    },

    /************************************
     * grunt-contrib-copy
     * Copy files and folders to a destination path
     ************************************/
    copy: {
      views: {
        expand: true,
        cwd: '<%= path.views %>',
        src: '*.html',
        dest: '<%= path.www %>/pages'
      },
      fonts: {
        expand: true,
        cwd: '<%= path.src %>/fonts',
        src: ['*.eot', '*.svg', '*.ttf', '*.woff'],
        dest: '<%= path.assets %>/fonts'
      }
    },

    /************************************
     * grunt-contrib-jshint
     * Validate files with JSHint
     ************************************/
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js',
            '<%= path.src %>/**/*.js']
    },

    /************************************
     * grunt-shell
     * Run shell commands
     ************************************/
    shell : {
      build : {
        options: {
          stdout: true
        },
        command : 'phonegap build'
      }
    },

    /************************************
     * grunt-contrib-connect
     * Start a connect web server
     ************************************/
    connect: {
      server: {
        options: {
          port: 9001,
          base: '<%= path.www %>'
        }
      }
    },

    /************************************
     * grunt-contrib-watch
     * Watch some files and tasks
     ************************************/
    watch: {
      html: {
        files: '<%= path.views %>/**/*.html',
        options: {
          livereload: true
        }
      },
      styles: {
        files: '<%= path.styles %>/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      javascripts: {
        files: '<%= path.src %>/js/**/*.js',
        tasks: ['dist-js'],
        options: {
          livereload: true
        }
      }
    },

    /************************************
     * grunt-banner
     * Adds a simple banner to files
     ************************************/
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: ['<%= path.assets %>/css/**/*.css',
              '<%= path.js %>/js/**/*.js']
      }
    }

  };

  // Init grunt configurations
  grunt.initConfig(appConfig);

  // Load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Displays the execution time of grunt tasks
  require('time-grunt')(grunt);

  // JS and CSS dist task
  grunt.registerTask('dist-css', ['sass']);
  grunt.registerTask('dist-js', ['concat', 'uglify', 'copy']);

};
