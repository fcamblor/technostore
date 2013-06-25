/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';

    var switchToView = function(){
        require([this.viewPath], function(ViewClass){
            if(window.currentView){
                window.currentView.undelegateEvents();
            }
            window.currentView = new ViewClass({ el: $("#todoapp") });
            window.currentView.render();
        });
    };

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "": "redirectToListAll",
            "!": "redirectToListAll",
            "!/": "redirectToListAll",
            "!/todos": _.bind(switchToView, {viewPath: "views/AllTodosListing"}),
            "!/active": _.bind(switchToView, {viewPath: "views/ActiveTodosListing"}),
            "!/completed": _.bind(switchToView, {viewPath: "views/CompletedTodosListing"})
        },

        initialize: function () {
            MainRouterClass.__super__.initialize.apply(this, arguments);
            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start();
        },

        redirectToListAll: function(){
            this.navigate("!/todos", {trigger: true, replace: true});
        }

    });

    return MainRouterClass;
});