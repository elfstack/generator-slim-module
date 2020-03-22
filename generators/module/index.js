'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs')

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Generate a new ${chalk.red('module')}`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your module name'
      },
    ];

    const prompts2 = [
      {
        type: 'input',
        name: 'namespace',
        message: 'Namespace of your module class',
        default: ''
      },
      {
        type: 'input',
        name: 'prefix',
        message: 'Your module API prefix',
        default: ''
      }
    ];

    // TODO: check duplicate module name

    const props = await this.prompt(prompts)
    // set module class namespace
    prompts2[0].default = `App\\Modules\\${this.toClassName(props.name)}`
    // set module API url prefix
    prompts2[1].default = props.name

    this.answers = await this.prompt(prompts2)
    this.answers.name = props.name
  }

  toClassName(name) {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  }

  writing() {
    const pathName = this.toClassName(this.answers.name)
    this.fs.copyTpl(
      this.templatePath('src/Modules/Module/Meta.php'),
      this.destinationPath(`src/Modules/${pathName}/Meta.php`),
      this.answers
    );
    this.fs.copy(
      this.templatePath('src/Modules/Module/Apis/.gitkeep'),
      this.destinationPath(`src/Modules/${pathName}/Apis/.gitkeep`),
    );
    this.fs.copy(
      this.templatePath('src/Modules/Module/Services/.gitkeep'),
      this.destinationPath(`src/Modules/${pathName}/Services/.gitkeep`),
    );
  }

  install() {
    this.log('registering modules...')
    const data = fs.readFileSync('src/routes.php').toString().split("\n");
    const idx = data.findIndex(item => item === '// DO NOT DELETE THIS LINE')
    data.splice(idx, 0, `    '${this.toClassName(this.answers.name)}',`);
    const text = data.join("\n");
    fs.writeFile('src/routes.php', text, function (err) {
      if (err) return this.log(err);
    });
  }
};
