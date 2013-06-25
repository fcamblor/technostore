/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "!/hello": "sayHello",
            "!/technos": "displayTechnos"
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
        },

        displayTechnos: function(){
            require(["views/ListingTechnos"], function(ListingTechnos){
                new ListingTechnos({ el: $("#content") }).render();
            });
        }

    });

    return MainRouterClass;
});