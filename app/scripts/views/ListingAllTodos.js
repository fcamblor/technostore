/*global define */
define([
    "backbone", "underscore", "hbs!templates/todosListing", 'rivets', 'models/Todos'
], function(Backbone, _, viewTemplate, rivets, Todos){
    'use strict';

    var ListingAllTodosClass = Backbone.View.extend({
        events: {
        },

        initialize: function(){
            ListingAllTodosClass.__super__.initialize.apply(this, arguments);

            this.todos = new Todos();
        },

        render: function(){
            // Rendering html
            this.$el.html(viewTemplate({}));

            // Activating rivet's binding on rendered html
            rivets.bind(this.$el, {
                todos: this.todos
            });

            // Once rivet's binding is done, fetching todos
            // (which will then automatically populate the DOM once http response is received, thanks to rivets)
            this.todos.fetch();

            return this;
        }

    });

    return ListingAllTodosClass;
});