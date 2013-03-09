require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        underscore: '../components/underscore/underscore',
        json2: '../components/require-handlebars-plugin/hbs/json2',
        handlebars: '../components/require-handlebars-plugin/Handlebars',
        i18nprecompile: '../components/require-handlebars-plugin/hbs/i18nprecompile',
        hbs: '../components/require-handlebars-plugin/hbs',
        bootstrap: 'vendor/bootstrap',
        rivets: '../components/rivets/lib/rivets',
        backbone: '../components/backbone/backbone',
        'backbone.localStorage': '../components/backbone.localStorage/backbone.localStorage'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        underscore: {
            deps: [],
            exports: '_'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        rivets: {
            deps: [],
            exports: 'rivets'
        }
    },
    deps: [ 'hbs' ],
    // hbs particular configuration properties
    hbs: {
        disableI18n: true // Support for i18n is useless for the moment...
    }
});

require(['app', 'jquery'], function (app, $,  Router) {
    'use strict';
        // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
