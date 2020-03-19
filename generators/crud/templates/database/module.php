<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

class <%= module %>Migration
{
// DO NOT DELETE OR EDIT THIS LINE 
}

$app = require('../src/bootstrap/app.php');
$schema = $app->getContainer()['db']->connection()->getSchemaBuilder();

// DO NOT DELETE OR EDIT THIS LINE 
