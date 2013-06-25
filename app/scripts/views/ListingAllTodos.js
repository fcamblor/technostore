/*global define */
define([
    "backbone", "underscore", "hbs!templates/todosListing", 'rivets'
], function(Backbone, _, viewTemplate, rivets){
    'use strict';

    var ListingAllTodosClass = Backbone.View.extend({
        events: {
        },

        initialize: function(){
            ListingAllTodosClass.__super__.initialize.apply(this, arguments);
        },

        render: function(){
            this.$el.html(viewTemplate({}));
            rivets.bind(this.$el, {

            });

            return this;
        }

    });

    return ListingAllTodosClass;
});