require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

require(['app'], function (app) {
    'use strict';

    // use app here
    console.log(app);
});
