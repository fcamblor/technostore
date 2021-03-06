/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';    

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "!/hello": "sayHello",
            "!/listTechnos": "listTechnos"
        },
    
        initialize: function () {
            MainRouterClass.__super__.initialize.apply(this, arguments);
            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start();
        },
    
        sayHello: function(){
            console.log("hello has been called !");
            require(["views/HelloView"], function(HelloView){
                window.view = new HelloView({ el: $(".hero-unit") }).render();
            });
        },

        listTechnos: function(){
            require(["views/TechnoListingView"], function(TechnoListingView){
                window.view = new TechnoListingView({ el: $(".hero-unit") }).render();
            });
        }
    });
    
    return MainRouterClass;
});