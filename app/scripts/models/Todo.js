/*global define */
define(["backbone", "underscore"], function(Backbone, _){
    'use strict';
    var TodoClass = Backbone.Model.extend({
        defaults: {
        },
        url: "https://api.mongolab.com/api/1/databases/todomvc/collections/todos?apiKey=fO6K0boLuhcPc1LvTg1bAiox6i2em1cW",

        initialize: function(attributes, options){
            TodoClass.__super__.initialize.call(this,attributes, options);
        }

        // Aliases
    });

    return TodoClass;
});