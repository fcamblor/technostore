/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "!/hello": "sayHello"
        },

        initialize: function () {
            debugger;
            MainRouterClass.__super__.initialize.apply(this, arguments);
            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start();
        },

        sayHello: function(){
            debugger;
            console.log("hello has been called !");
        }

    });

    return MainRouterClass;
});