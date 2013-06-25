/*global define */
define([
    "backbone", "underscore", "hbs!templates/todosListing", 'rivets', 'models/Todos', 'models/Todo'
], function(Backbone, _, viewTemplate, rivets, Todos, Todo){
    'use strict';

    var ListingAllTodosClass = Backbone.View.extend({
        events: {
            "blur #new-todo": "addEditedTodo",
            "change .toggle": "toggleTodoStatus",
            "click .destroy": "deleteTodo"
        },

        initialize: function(){
            ListingAllTodosClass.__super__.initialize.apply(this, arguments);

            this.todos = new Todos();
            this.editedTodo = new Todo({ status: "pending" });
        },

        render: function(){
            // Rendering html
            this.$el.html(viewTemplate({}));

            // Activating rivet's binding on rendered html
            rivets.bind(this.$el, {
                todos: this.todos,
                editedTodo: this.editedTodo
            });

            // Once rivet's binding is done, fetching todos
            // (which will then automatically populate the DOM once http response is received, thanks to rivets)
            this.todos.fetch();

            return this;
        },

        addEditedTodo: function(){
            var todoProps = this.editedTodo.toJSON();
            if(todoProps.label && todoProps.label !== ""){
                var self = this;

                // Cloning editedTodo in order to not modify model binded to the DOM
                var todoToCreate = new Todo(todoProps );

                // Calling save() on the todo will ensure the todo has been persisted
                // (when calling the save() method, a POST is send on Todo.url)
                $.when(todoToCreate.save()).then(function(){
                    // We add the todo to the todos collection if and only if todo was correctly persisted
                    self.todos.add(todoProps);

                    // Resetting editedTodo's label
                    self.editedTodo.set({ label: "" });
                });
            }
        },

        toggleTodoStatus: function(event){
            var targetTodo = this._resolveTodoRelatedTo(event.currentTarget);

            // Toggling todo's status
            targetTodo.toggleStatus();
            $.when(targetTodo.save()).fail(function(){
                // If failure happens during persistence, re-toggling to revert to old status on UI
                targetTodo.toggleStatus();
            });
        },

        deleteTodo: function(event){
            var targetTodo = this._resolveTodoRelatedTo(event.currentTarget);

            // wait:true will wait for server to respond ok before removing targetTodo from its collections
            targetTodo.destroy({ wait: true });
        },

        // Will resolve Todo attached to the DOM in the targetEl ancestors
        _resolveTodoRelatedTo: function(targetEl){
            return $(targetEl).findDataInHierarchy("todo");
        }

    });

    return ListingAllTodosClass;
});