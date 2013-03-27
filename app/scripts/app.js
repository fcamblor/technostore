/*global define */
define(['jquery', 'bootstrap', 'routers/MainRouter'], function ($, bootstrap, MainRouter) {
    'use strict';

    console.log('Running jQuery %s', $().jquery);

    new MainRouter();

    return '\'Allo \'Allo!';
});