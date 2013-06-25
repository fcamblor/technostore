/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "": "redirectToListAll",
            "!": "redirectToListAll",
            "!/": "redirectToListAll",
            "!/todos": "listAllTodos"
        },

        initialize: function () {
            MainRouterClass.__super__.initialize.apply(this, arguments);
            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start();
        },

        redirectToListAll: function(){
            this.navigate("!/todos", {trigger: false, replace: true});
        },

        listAllTodos: function(){
            require(['views/ListingAllTodos'], function(ViewClass){
                window.currentView = new ViewClass({ el: $("#todoapp") });
                window.currentView.render();
            });
        }

    });

    return MainRouterClass;
});