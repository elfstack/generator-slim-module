<?php
/** Setup shortcuts for container */
function app($id) {
    global $app;
    return $app->getContainer()->get($id);
}