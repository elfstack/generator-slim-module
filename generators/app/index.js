'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the groovy ${chalk.red('generator-slim-module')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('.env.example'),
      this.destinationPath('.env')
    );
    this.fs.copy(
      this.templatePath('.env.example'),
      this.destinationPath('.env.example')
    );
    this.fs.copy(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json')
    );
    this.fs.copy(
      this.templatePath('src/routes.php'),
      this.destinationPath('src/routes.php')
    );
  }

  install() {
    this.spawnCommand('composer', ['install']);
  }
};
