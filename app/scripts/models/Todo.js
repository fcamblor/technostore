/*global define */
define(["backbone", "underscore"], function(Backbone, _){
    'use strict';
    var TodoClass = Backbone.Model.extend({
        defaults: {
        },
        urlRoot: "https://api.mongolab.com/api/1/databases/todomvc/collections/todos?apiKey=fO6K0boLuhcPc1LvTg1bAiox6i2em1cW",

        initialize: function(attributes, options){
            TodoClass.__super__.initialize.call(this,attributes, options);
            // Binding mongodb's _id to Backbone model's id, in order to make save()
            // work on current model, when id is available
            var updateModelId = function(){ this.id = this.get("_id")?this.get("_id")['$oid']:null; };
            updateModelId.apply(this); // Updating id right now
            // Ensuring this.id is updated in case the _id field is updated (should not happen in real life, but who knows...)
            this.bind("change:_id", updateModelId, this);
        },

        isCompleted: function(){
            return this.get("status")==="completed";
        }

        // Aliases
    });

    return TodoClass;
});