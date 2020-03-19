<?php
// Register modules here
$modules->register([
// DO NOT DELETE THIS LINE
]);

$app->get('/collect', function ($req, $res) use ($modules) {
    return $res->write("<b>collect apis and services of registered modules:</b><pre>".$modules->collect());
});

// Or define global non-module routes
// $app->get('/', App\Controllers\Example::class.':home');
