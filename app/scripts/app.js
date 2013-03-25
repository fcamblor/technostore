/*global define */
define("app", ['jquery', 'routers/MainRouter', 'handlebars', 'bootstrap'], function ($, MainRouter, Handlebars) {
    'use strict';

    console.log('Running jQuery %s', $().jquery);

    Handlebars.registerHelper("typeToClass", function(){
        return this.type === 1?"tooling":"jsfmk";
    });

    new MainRouter();

    return '\'Allo \'Allo!';
});
