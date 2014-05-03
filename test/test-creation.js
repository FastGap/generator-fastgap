/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Fastgap generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('fastgap:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // expec~ src/controllers
      'src/controllers/HomeController.js',

      // expec~ phonegap files.
      'www/config.xml',
      'platforms/.gitkeep',
      'plugins/.gitkeep',
      'merges/.gitkeep',
      'hooks/.gitkeep',

      // expec~ bower files.
      '.bowerrc',
      'bower.json',

      // expec~ project files.
      'README.md',
      'Gruntfile.js',
      '.jshintrc',
      '.editorconfig',

      // expec~ test files.
      'www/spec.html',
      'www/spec/index.js',
      'www/spec/helper.js',
        // jasmine lib
        'www/spec/lib/jasmine-1.2.0/jasmine-html.js',
        'www/spec/lib/jasmine-1.2.0/jasmine.css',
        'www/spec/lib/jasmine-1.2.0/jasmine.js',
        'www/spec/lib/jasmine-1.2.0/MIT.LICENSE',

      // expec~ git files.
      '.gitignore',
      '.gitattributes'

    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    helpers.mockPrompt(this.app, {
      platforms: ['platformiOS', 'platformAndroid']
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
