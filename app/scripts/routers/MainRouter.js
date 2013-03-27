/*global define */
define(["jquery", "backbone", "underscore", "views/HelloView"], function($, Backbone, _, HelloView){
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
            console.log("hello has been called !");
            debugger;
            window.view = new HelloView({ el: $(".hero-unit") }).render();
        }
    
    });
    
    return MainRouterClass;
});