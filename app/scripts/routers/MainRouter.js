/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "!/hello": "sayHello"
        },

        initialize: function () {
            MainRouterClass.__super__.initialize.apply(this, arguments);
            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start();
        },

        sayHello: function(){
            require(["views/HelloView"], function(HelloView){
                new HelloView({ el: $("#content") }).render();
            });
        }

    });

    return MainRouterClass;
});