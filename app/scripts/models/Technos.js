define(["backbone", "underscore", "models/Techno"], function(Backbone, _, modelType){
    var TechnosClass = Backbone.Collection.extend({
        model: modelType,
        defaults: {
        },

        initialize: function(properties, classProperties){
            TechnosClass.__super__.initialize.call(this,properties, classProperties);
        }

        // Aliases
    });

    return TechnosClass;
});
