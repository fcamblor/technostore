/*global define */
define("app", ['jquery', 'routers/MainRouter', 'bootstrap'], function ($, MainRouter) {
    'use strict';

    console.log('Running jQuery %s', $().jquery);

    new MainRouter();

    return '\'Allo \'Allo!';
});
