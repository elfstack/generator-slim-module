'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const yaml = require('yaml');

module.exports = class extends Generator {
  constructor(args, opts) {
     // Calling the super constructor is important so our generator is correctly set up
     super(args, opts);
     this.argument('module', {
       type: String,
       required: true,
       description: 'Scaffolding CRUD to which module'
     })
     this.argument('from', {
       type: String,
       required: true,
       description: 'Source yaml'
     });
  }

  initializing() {
    const file = fs.readFileSync(this.options.from, 'utf8')
    this.source = yaml.parse(file)
  }

  _createMigration() {
    const moduleName = this.options.module

    this.fs.copyTpl(
      this.templatePath('database/module.php'),
      this.destinationPath(`database/${moduleName}.php`),
      {
        module: moduleName
      }
    );
  }

  _writingModel(modelName, properties) {
    const moduleName = this.options.module
    const tableName = properties.tableName

    this.fs.copyTpl(
      this.templatePath('src/Modules/Module/Models/Model.php'),
      this.destinationPath(`src/Modules/${moduleName}/Models/${modelName}.php`),
      {
        module: moduleName,
        model: modelName,
        tableName: tableName
      }
    );
  }

  _writingController(modelName, properties) {
    const moduleName = this.options.module

    this.fs.copyTpl(
      this.templatePath('src/Modules/Module/Apis/ModelController.php'),
      this.destinationPath(`src/Modules/${moduleName}/Apis/${modelName}Controller.php`),
      {
        module: moduleName,
        model: modelName
      }
    );
  }

  writing() {
    // TODO: this will override previous module migration, change it to prevent override
    this._createMigration()
    Object.entries(this.source).forEach(([modelName, properties]) => {
      this._writingModel(modelName, properties)
      this._writingController(modelName, properties)
    })
  }

  install() {
    // TODO: register routes
  }
};
