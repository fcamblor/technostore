/*global define */
define(["backbone", "underscore", "models/Techno"], function(Backbone, _, modelType){
    'use strict';    
    var TechnosClass = Backbone.Collection.extend({
        model: modelType,
        url: "/data/technos.json",
        defaults: {
        },

        initialize: function(properties, classProperties){
            TechnosClass.__super__.initialize.call(this,properties, classProperties);
        },

        countToolings: function(){ return _.filter(this.models, function(techno){ return techno.get("type")===1; }).length; }

        // Aliases
    });

    return TechnosClass;
});