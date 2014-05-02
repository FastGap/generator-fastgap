
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
    }

  };

  // Init grunt configurations
  grunt.initConfig(appConfig);

  // Load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Displays the execution time of grunt tasks
  require('time-grunt')(grunt);

  // CSS dist task
  grunt.registerTask('dist-css', ['sass']);

};
