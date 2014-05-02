
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


  };

  // Init grunt configurations
  grunt.initConfig(appConfig);

};
