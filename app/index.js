'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var MbpGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
      console.log(this.yeoman);
      console.log(chalk.magenta('You\'re using the Mobile Blueprints generator. Out of the box I include Zepto.js, iScroll, HammerJS and FastClick libraries for help to build your Mobile app.'));
    }

    var prompts = [{
      type: 'checkbox',
      name: 'platforms',
      message: 'What platforms you build?',
      choices: [{
        name: 'iOS',
        value: 'platformiOS',
        checked: true
      }, {
        name: 'Android',
        value: 'platformAndroid',
        checked: false
      }]
    }];

    this.prompt(prompts, function (answers) {
      var platforms = answers.platforms;

      function hasPlatform(feat) { return platforms.indexOf(feat) !== -1; }

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.platformiOS = hasPlatform('platformiOS');
      this.platformAndroid = hasPlatform('platformAndroid');

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('www');
    this.mkdir('platfoms');
    this.mkdir('plugins');
    this.mkdir('merges');

    this.copy('_package.json', 'package.json');

    if (this.platformiOS) {
      this.write(
        'www/stylesheets/css/media/ios/iphone-5.css',
        'console.log "\'Allo from iOS!"'
      );
    }

    if (this.platformAndroid) {
      this.write(
        'www/stylesheets/css/media/android/galaxy-s3.css',
        'console.log "\'Allo from Android!"'
      );
    }
  },

  bower: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  },

  javascripts: function () {
    this.mkdir('www/javascripts');
    this.mkdir('www/javascripts/js');

    this.copy('javascripts/js/index.js', 'www/javascripts/js/index.js');
  },

  stylesheets: function () {
    this.mkdir('www/stylesheets');
    this.mkdir('www/stylesheets/css');

    this.copy('stylesheets/css/base.css', 'www/stylesheets/css/base.css');
    this.copy('stylesheets/css/reset.css', 'www/stylesheets/css/reset.css');
    this.copy('stylesheets/css/transitions.css', 'www/stylesheets/css/transitions.css');
  },

  phonegap: function () {
    this.copy('gitkeep', 'platforms/.gitkeep');
    this.copy('gitkeep', 'plugins/.gitkeep');
    this.copy('gitkeep', 'merges/.gitkeep');
  },

  projectfiles: function () {
    this.copy('README.md', 'README.md');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },

  git: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  }
});

module.exports = MbpGenerator;