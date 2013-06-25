/*global define */
define(["backbone", "underscore", "models/Todo"], function(Backbone, _, modelType){
    'use strict';
    var TodosClass = Backbone.Collection.extend({
        model: modelType,
        defaults: {
        },
        url: "https://api.mongolab.com/api/1/databases/todomvc/collections/todos?apiKey=fO6K0boLuhcPc1LvTg1bAiox6i2em1cW",

        initialize: function(properties, classProperties){
            TodosClass.__super__.initialize.call(this,properties, classProperties);
        },

        pendings: function(){
            return _.filter(this.models, function(todo){ return !todo.isCompleted(); });
        },

        pendingCount: function(){
            return this.pendings().length;
        },

        completed: function(){
            return _.filter(this.models, function(todo){ return todo.isCompleted(); });
        },

        completedCount: function(){
            return this.completed().length;
        },

        totalCount: function(){
            return this.models.length;
        }

        // Aliases
    });

    return TodosClass;
});