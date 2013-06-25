/*global define */
define(["backbone", "underscore"], function(Backbone, _){
    'use strict';
    var TodoClass = Backbone.Model.extend({
        defaults: {
        },
        url: function(){
            if(this.isNew()){
                return "https://api.mongolab.com/api/1/databases/todomvc/collections/todos?apiKey=fO6K0boLuhcPc1LvTg1bAiox6i2em1cW";
            } else {
                return "https://api.mongolab.com/api/1/databases/todomvc/collections/todos/"+this.id+"?apiKey=fO6K0boLuhcPc1LvTg1bAiox6i2em1cW";
            }
        },

        initialize: function(attributes, options){
            TodoClass.__super__.initialize.call(this,attributes, options);

            // Weird hack fixing some special case where a new Todo is instanciated from a Todos collection
            // and where the url is overriden by the Todos' (collection) url whereas it shouldn't when some Backbone.Model.url()
            // has been overwritten in current class
            // Without this, you won't have correct urls for PUT (save when current model is not new) and DELETE (destroy)
            this.url = TodoClass.prototype.url;

            // Binding mongodb's _id to Backbone model's id, in order to make save()
            // work on current model, when id is available
            var updateModelId = function(){ this.id = this.get("_id")?this.get("_id")['$oid']:null; };
            updateModelId.apply(this); // Updating id right now
            // Ensuring this.id is updated in case the _id field is updated (should not happen in real life, but who knows...)
            this.bind("change:_id", updateModelId, this);
        },

        isCompleted: function(){
            return this.get("status")==="completed";
        },

        toggleStatus: function(){
            this.set({"status": this.isCompleted()?"pending":"completed"});
        }

        // Aliases
    });

    return TodoClass;
});