<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

class CourseMigration
{
    public static function createFacultyTable(Builder $schema)
    {
        $schema->dropIfExists('faculties');
        $schema->create('faculties', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code');
            $table->string('name');
            $table->timestamps();
        });
    }

    public static function createDepartmentTable(Builder $schema)
    {
        $schema->dropIfExists('departments');
        $schema->create('departments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('faculty_id');
            $table->string('code');
            $table->string('name');
            $table->timestamps();
        });
    }
}

$app = require('../src/bootstrap/app.php');
$schema = $app->getContainer()['db']->connection()->getSchemaBuilder();

CourseMigration::createFacultyTable($schema);
