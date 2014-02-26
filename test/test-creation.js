/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('mbp generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('mbp:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // expec~ stylesheets files.
      'www/stylesheets/css/reset.css',
      'www/stylesheets/css/base.css',
      'www/stylesheets/css/transitions.css',

      // expec~ javascripts files.
      'www/javascripts/js/index.js',

      // expec~ phonegap files.
      'platforms/.gitkeep',
      'plugins/.gitkeep',

      // expec~ project files.
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
