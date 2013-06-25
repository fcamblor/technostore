/*global define */
define(["backbone", "underscore", "models/Techno"], function(Backbone, _, modelType){
    'use strict';
    var TechnosClass = Backbone.Collection.extend({
        model: modelType,
        defaults: {
        },
        url: "/data/technos.json",

        initialize: function(properties, classProperties){
            TechnosClass.__super__.initialize.call(this,properties, classProperties);
        }

        // Aliases
    });

    return TechnosClass;
});