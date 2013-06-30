/*global define */
define([
    "backbone", "underscore", "hbs!templates/todosListing", 'rivets', 'models/Todos', 'models/Todo', 'models/Navigation'
], function(Backbone, _, viewTemplate, rivets, Todos, Todo, Navigation){
    'use strict';

    var GenericTodosListing = Backbone.View.extend({
        events: {
            "blur #new-todo": "addEditedTodo",
            "change .toggle": "toggleTodoStatus",
            "click .destroy": "deleteTodo",
            "click #clear-completed": "clearCompleted",
            "change #toggle-all": "toggleAllTodoStatuses"
        },

        initialize: function(){
            GenericTodosListing.__super__.initialize.apply(this, arguments);

            this.todos = new Todos();
            this.editedTodo = new Todo({ status: "pending" });
            this.navigation = new Navigation();
        },

        render: function(){
            // Rendering html
            this.$el.html(viewTemplate({}));

            // Activating rivet's binding on rendered html
            rivets.bind(this.$el, {
                todos: this.todos,
                editedTodo: this.editedTodo,
                navigation: this.navigation
            });

            // Once rivet's binding is done, fetching todos
            // (which will then automatically populate the DOM once http response is received, thanks to rivets)
            this.todos.fetch({ url: this.todosFetchUrl });

            return this;
        },

        toggleAllTodoStatuses: function(event){
            var toggleToCompleted = $(event.currentTarget).is(":checked");
            var self = this;
            this.todos.each(function(todo){
                if(toggleToCompleted === !todo.isCompleted()){
                    self._toggleTodoStatus(todo);
                }
            });
        },

        addEditedTodo: function(){
            var todoProps = this.editedTodo.toJSON();
            if(todoProps.label && todoProps.label !== ""){
                var self = this;

                // Cloning editedTodo in order to not modify model binded to the DOM
                todoProps.timestamp = new Date().getTime();
                var todoToCreate = new Todo( todoProps );

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

        _toggleTodoStatus: function(targetTodo){
            // Toggling todo's status
            targetTodo.toggleStatus();
            // FIXME : WHEN TOGGLING STATUS, CALCULATED ELEMENT ARE NOT RE-CALCULATED
            // More info here : https://github.com/mikeric/rivets/issues/185
            $.when(targetTodo.save()).fail(function(){
                // If failure happens during persistence, re-toggling to revert to old status on UI
                targetTodo.toggleStatus();
            });
        },

        toggleTodoStatus: function(event){
            var targetTodo = this._resolveTodoRelatedTo(event.currentTarget);

            this._toggleTodoStatus(targetTodo);
        },

        deleteTodo: function(event){
            var targetTodo = this._resolveTodoRelatedTo(event.currentTarget);

            // wait:true will wait for server to respond ok before removing targetTodo from its collections
            targetTodo.destroy({ wait: true });
        },

        clearCompleted: function(){
            var completedTodos = this.todos.completed();
            _.each(completedTodos, function(todo){
                // wait:true will wait for server to respond ok before removing targetTodo from its collections
                todo.destroy({ wait: true });
            });
        },

        // Will resolve Todo attached to the DOM in the targetEl ancestors
        _resolveTodoRelatedTo: function(targetEl){
            return $(targetEl).findDataInHierarchy("todo");
        },

        // OVERRIDABLE basic url (see subclasses of current class)
        todosFetchUrl: "https://api.mongolab.com/api/1/databases/todomvc/collections/todos?apiKey=fO6K0boLuhcPc1LvTg1bAiox6i2em1cW"

    });

    return GenericTodosListing;
});