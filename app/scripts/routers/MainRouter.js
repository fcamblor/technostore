/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "": "redirectToListAll",
            "!": "redirectToListAll",
            "!/": "redirectToListAll",
            "!/todos": "listAllTodos",
            "!/active": "listActiveTodos",
            "!/completed": "listCompletedTodos"
        },

        initialize: function () {
            MainRouterClass.__super__.initialize.apply(this, arguments);
            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start();
        },

        redirectToListAll: function(){
            this.navigate("!/todos", {trigger: true, replace: true});
        },

        listAllTodos: function(){
            require(['views/AllTodosListing'], function(ViewClass){
                if(window.currentView){
                    window.currentView.undelegateEvents();
                }
                window.currentView = new ViewClass({ el: $("#todoapp") });
                window.currentView.render();
            });
        },

        listActiveTodos: function(){
            require(['views/ActiveTodosListing'], function(ViewClass){
                if(window.currentView){
                    window.currentView.undelegateEvents();
                }
                window.currentView = new ViewClass({ el: $("#todoapp") });
                window.currentView.render();
            });
        },

        listCompletedTodos: function(){
            require(['views/CompletedTodosListing'], function(ViewClass){
                if(window.currentView){
                    window.currentView.undelegateEvents();
                }
                window.currentView = new ViewClass({ el: $("#todoapp") });
                window.currentView.render();
            });
        }

    });

    return MainRouterClass;
});