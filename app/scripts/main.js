/*global require */
require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        underscore: '../components/underscore/underscore',
        backbone: '../components/backbone/backbone',
        json2: '../components/require-handlebars-plugin/hbs/json2',
        handlebars: '../components/require-handlebars-plugin/Handlebars',
        i18nprecompile: '../components/require-handlebars-plugin/hbs/i18nprecompile',
        hbs: '../components/require-handlebars-plugin/hbs',
        bootstrap: 'vendor/bootstrap',
        rivets: '../components/rivets/lib/rivets'
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
        // "default" backbone.js files are not AMD-compatible
        // => We must not consider it as proper backbone dependency, this is why we add here
        // shim config which provide window.Backbone as module dependency
        backbone: {
            deps: ["underscore", "jquery"],
            // Note : This is strange that exports:"Backbone" is not enough
            // for strange reasons, we have to confirm it with init function
            // because otherwise, window.Backbone won't be provided as module dependency
            exports: "Backbone"
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


require(['app'], function (app) {
    'use strict';

    // use app here
    console.log(app);
});
