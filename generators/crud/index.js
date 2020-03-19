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

  _processMigrationFields(fields) {
    return Object.entries(fields).map(([column, properties]) => {
      let line = '            $table->'
      const constraints = this._processFieldConstraints(properties.constraints)

      // add column def
      let terminateFlag = false
      switch (properties.type) {
        case 'id':
          terminateFlag = true
        case 'timestamps':
          terminateFlag = true
        case 'string':
          line += `string(${column}${this._getConstraint('max', constraints) ? ', ' + this._getConstraint('max', constraints).value : ''})`
          break
        default:
          line += `${properties.type}()`
          break;
      }

      if (terminateFlag) {
        return line
      }

      let nullableFlag = true

      // append column modifier
      constraints.forEach(constraint => {
        switch (constraint.constraint) {
          case 'notNull':
            nullableFlag = false
            break;
        }
      })

      line += nullableFlag ? '->nullable()' : ''

      return line
    }).join(';\n');
  }

  _processFieldConstraints(constraints) {
    if (!constraints) return []
    return constraints.map(constraint => {
      switch (true) {
        case /[a-zA-Z]+=\d+/.test(constraint):
          return {
            constraint: constraint.split('=')[0],
            value: constraint.split('=')[1]
          }
        default:
          return {
            constraint: constraint
          }
      }
    })
  }

  _getConstraint(constraint, constraints) {
    return constraints.find(cst => cst.constraint === constraint)
  }

  _writingMigration(modelName, properties) {
    const moduleName = this.options.module
    const tableName = properties.tableName

    const defineTableTpl = `
    public static function create${modelName}Table(Builder $schema)
    {
        $schema->dropIfExists('${tableName}');
        $schema->create('${tableName}', function (Blueprint $table) {
${this._processMigrationFields(properties.fields)}
        });
    }
    `
    const callTableTpl = `${moduleName}Migration::create${modelName}Table($schema);`

    const data = fs.readFileSync(`database/${moduleName}.php`).toString().split("\n");
    const defIdx = data.findIndex(item => item === '// TABLEDEF, DO NOT DELETE')
    data.splice(defIdx, 0, defineTableTpl);

    const callIdx = data.findIndex(item => item === '// CALLMIGRATION, DO NOT DELETE')
    data.splice(callIdx, 0, callTableTpl);

    const text = data.join("\n");
    this.log(text)
    fs.writeFile(`database/${moduleName}.php`, text, function (err) {
      if (err) return this.log(err);
    });
  }

  _writingModel(modelName, properties) {
    const moduleName = this.options.module
    const tableName = properties.tableName

    const params = {
      module: moduleName,
      model: modelName,
      tableName: tableName,
      fillable: Object.entries(properties.fields).filter(([column, properties]) => properties.fillable).map(([column, properties]) => column),
      hidden: Object.entries(properties.fields).filter(([column, properties]) => properties.hidden).map(([column, properties]) => column),
    }

    this.fs.copyTpl(
      this.templatePath('src/Modules/Module/Models/Model.php'),
      this.destinationPath(`src/Modules/${moduleName}/Models/${modelName}.php`),
      params
    );
  }

  _writingController(modelName, properties) {
    const moduleName = this.options.module

    // TODO: check constraints
    // TODO: check searchable, filterable, sortable

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
    const moduleName = this.options.module

    // create if migration file not exist
    if(!fs.existsSync(`database/${moduleName}.php`)) {
      this._createMigration()
      this._writeFiles(() => {
        this._modifying(moduleName)
      })
    } else {
      this._modifying(moduleName)
    }
  }

  _modifying(moduleName) {
    Object.entries(this.source).forEach(([modelName, properties]) => {
      this._writingMigration(modelName, properties)
      this._writingModel(modelName, properties)
      this._writingController(modelName, properties)
    })
  }

  install() {
    // TODO: register routes
  }
};
