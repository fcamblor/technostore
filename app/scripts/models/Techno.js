define(["backbone", "underscore"], function(Backbone, _){
    var TechnoClass = Backbone.Model.extend({
        defaults: {
            summary: "blablabla"
        },

        initialize: function(attributes, options){
            TechnoClass.__super__.initialize.call(this,attributes, options);
        }

        // Aliases
    });

    return TechnoClass;
});