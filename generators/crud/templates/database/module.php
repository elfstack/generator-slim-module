<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

class <%= module %>Migration
{
// TABLEDEF, DO NOT DELETE
}

$app = require('../src/bootstrap/app.php');
$schema = $app->getContainer()['db']->connection()->getSchemaBuilder();

// CALLMIGRATION, DO NOT DELETE
