require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        underscore: '../components/underscore/underscore',
        json2: '../components/require-handlebars-plugin/hbs/json2',
        handlebars: '../components/require-handlebars-plugin/Handlebars',
        i18nprecompile: '../components/require-handlebars-plugin/hbs/i18nprecompile',
        hbs: '../components/require-handlebars-plugin/hbs',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        underscore: {
            deps: [],
            exports: '_'
        }
    },
    // hbs particular configuration properties
    hbs: {
        disableI18n: true // Support for i18n is useless for the moment...
    }
});

require(['hbs'], function () {
    'use strict';
    require(['app', 'jquery', 'hbs!templates/hello/Hello', 'bootstrap'], function (app, $, helloTemplate) {
        // use app here
        console.log(app);
        console.log(helloTemplate({who: "Bob sponge"}));
        console.log('Running jQuery %s', $().jquery);
    });
});
