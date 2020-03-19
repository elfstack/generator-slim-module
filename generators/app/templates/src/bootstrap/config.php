<?php
return [
    'displayErrorDetails' => env('APP_DEBUG', false),
    'db' => [
        'driver' => env('DB_DRIVER', 'mysql'),
        'host' => env('DB_HOST', 'localhost'),
        'database' => env('DB_DATABASE', 'database'),
        'username' => env('DB_USER', 'root'),
        'password' => env('DB_PASSWORD', 'root'),
        'charset' => env('DB_CHARSET', 'utf8'),
        'collation' => env('DB_COLLATION', 'utf8_unicode_ci'),
        'prefix' => env('DB_PREFIX', '')
    ],
    'log' => [
        'name' => env('LOG_NAME', 'slim'),
        'file' => env('LOG_FILE', 'storage/logs/slim.log'),
        'level' => env('LOG_LEVEL', 300)
    ],
    'session' => [
        'name' => env('SESSION_NAME', 'slim_session'),
        'autofresh' => env('SESSION_AUTOFRESH', true),
        'lifetime' => env('SESSION_LIFETIME', '1 hour')
    ]
];
