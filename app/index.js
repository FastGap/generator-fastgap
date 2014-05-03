'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var FastgapGenerator = yeoman.generators.Base.extend({
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
      console.log(chalk.magenta('You\'re using the FastGap generator. Out of the box I include Zepto.js, iScroll, HammerJS and FastClick libraries for help to build your Phonegap app.'));
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

  appfiles: function () {
    this.copy('src/views/index.html', 'www/index.html');
    this.copy('www/config.xml', 'www/config.xml');
  },

  bower: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  },

  assets: function () {
    this.mkdir('www/assets');
    this.mkdir('www/assets/js');
    this.mkdir('www/assets/js/main.js');
    this.mkdir('www/assets/css');
    this.mkdir('www/assets/css/main.css');
  },

  phonegap: function () {
    this.copy('gitkeep', 'platforms/.gitkeep');
    this.copy('gitkeep', 'plugins/.gitkeep');
    this.copy('gitkeep', 'merges/.gitkeep');
    this.copy('gitkeep', 'hooks/.gitkeep');
  },

  projectfiles: function () {
    this.copy('README.md', 'README.md');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },

  controllers: function () {
    this.copy('src/controllers/HomeController.js', 'src/controllers/HomeController.js');
  },

  styles: function () {
    this.copy('src/styles/build.scss', 'src/styles/build.scss');
  },

  pages: function () {
    this.copy('src/views/pages/home.html', 'www/pages/home.html');
  },

  testfiles: function () {
    this.copy('www/spec.html', 'www/spec.html');
    this.copy('www/spec/index.js', 'www/spec/index.js');
    this.copy('www/spec/helper.js', 'www/spec/helper.js');
      // lib: jasmine-1.2.0
      this.copy('www/spec/lib/jasmine-1.2.0/jasmine-html.js', 'www/spec/lib/jasmine-1.2.0/jasmine-html.js');
      this.copy('www/spec/lib/jasmine-1.2.0/jasmine.css', 'www/spec/lib/jasmine-1.2.0/jasmine.css');
      this.copy('www/spec/lib/jasmine-1.2.0/jasmine.js', 'www/spec/lib/jasmine-1.2.0/jasmine.js');
      this.copy('www/spec/lib/jasmine-1.2.0/MIT.LICENSE', 'www/spec/lib/jasmine-1.2.0/MIT.LICENSE');
  },

  git: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  install: function () {
    if (this.options['skip-install']) {
      return;
    }

    var done = this.async();
    this.installDependencies({
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install'],
      callback: done
    });
  }
});

module.exports = FastgapGenerator;
