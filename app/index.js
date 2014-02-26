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

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the Mobile Blueprints generator. Out of the box I include Zepto.js, iScroll, HammerJS and FastClick libraries for help to build your Mobile app.'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to create that scaffold now?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('www');
    this.mkdir('platfoms');
    this.mkdir('plugins');
    this.mkdir('merges');

    this.copy('_package.json', 'package.json');
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
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = MbpGenerator;